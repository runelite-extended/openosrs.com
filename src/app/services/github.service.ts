import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { NgxIndexedDB } from 'ngx-indexed-db';

import {
  GithubContent,
  GithubContentFlat,
  GithubBuildLinks,
  GithubContentFile,
  ClientHash,
  HashReturn,
  LatestClient
} from './../interfaces/github.interface';
import { Github, GithubFlat } from '../interfaces/github.interface';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrlApi = 'https://api.github.com';
  private baseUrlRaw = 'https://raw.githubusercontent.com';
  private user = 'runelite-extended';
  private repository = 'runelite';
  private mavenRepository = 'maven-repo';
  private runelitPath = 'net/runelit/client';

  private db = new NgxIndexedDB('runelite-plus', 1);

  constructor(private http: HttpClient) {
  }

  private static githubToGithubFlat(commits: Github[]): GithubFlat[] {
    const flatCommits = [];

    for (const commit of commits) {
      flatCommits.push({
        message: commit.commit.message,
        date: commit.commit.committer.date,
        html_url: commit.html_url,
        author_name: commit.commit.author.name,
        author_login: commit.author ? commit.author.login : null,
        author_html_url: commit.author ? commit.author.html_url : null,
        committer_name: commit.commit.committer.name,
        committer_login: commit.committer ? commit.committer.login : null,
        committer_html_url: commit.committer ? commit.committer.html_url : null
      });
    }

    return flatCommits;
  }

  private static githubContentsToName(clients: GithubContent[]): GithubContentFlat[] {
    const flatClients = [];

    for (const client of clients) {
      flatClients.push({
        name: client.name
      });
    }

    return flatClients;
  }

  private async openDatabase(): Promise<any> {
    return this.db.openDatabase(1, evt => {
      const objectStoreGithubModified = evt.currentTarget.result.createObjectStore('github_modified');

      // Last modified
      objectStoreGithubModified.createIndex('update', 'update', { unique: false });

      const objectStoreGithubClient = evt.currentTarget.result.createObjectStore('github_clients', { keyPath: 'id', autoIncrement: true });
      objectStoreGithubClient.createIndex('name', 'name', { unique: true });

      const objectStoreGithubClientHashes = evt.currentTarget.result.createObjectStore('github_client_hashes');
      objectStoreGithubClientHashes.createIndex('version', 'version', { unique: false });
      objectStoreGithubClientHashes.createIndex('hash', 'hash', { unique: true });

      const objectStoreGithubCommits = evt.currentTarget.result.createObjectStore('github_commits', { keyPath: 'id', autoIncrement: true });

      // Commit
      objectStoreGithubCommits.createIndex('message', 'message', { unique: false });
      objectStoreGithubCommits.createIndex('date', 'date', { unique: false });
      objectStoreGithubCommits.createIndex('html_url', 'html_url', { unique: false });

      // Author
      objectStoreGithubCommits.createIndex('author_name', 'author_name', { unique: false });
      objectStoreGithubCommits.createIndex('author_login', 'author_login', { unique: false });
      objectStoreGithubCommits.createIndex('author_html_url', 'author_html_url', { unique: false });

      // Commiter
      objectStoreGithubCommits.createIndex('commiter_name', 'commiter_name', { unique: false });
      objectStoreGithubCommits.createIndex('commiter_login', 'commiter_login', { unique: false });
      objectStoreGithubCommits.createIndex('commiter_html_url', 'commiter_html_url', { unique: false });
    });
  }

  private async getLastmodified(key: number): Promise<string> {
    return this.db.getByKey('github_modified', key).then(
      (modified) => {
        if (typeof modified === 'undefined') {
          return undefined;
        }

        return modified.update;
      },
      () => {
        return undefined;
      }
    );
  }

  private setLastModified(headers: HttpHeaders, key: number): void {
    if (typeof headers !== 'undefined' && typeof headers.get('Last-Modified') !== 'undefined') {
      this.db.delete('github_modified', key).then(
        () => {
          this.db.add('github_modified', {
            update: headers.get('Last-Modified'),
          }, key);
        }
      );
    }
  }

  private saveCommits(commits: Github[]): void {
    this.db.clear('github_commits').then(
      () => {
        for (const commit of commits) {
          this.db.add('github_commits', {
            message: commit.commit.message,
            date: commit.commit.committer.date,
            html_url: commit.html_url,
            author_name: commit.commit.author.name,
            author_login: commit.author ? commit.author.login : null,
            author_html_url: commit.author ? commit.author.html_url : null,
            committer_name: commit.commit.committer.name,
            committer_login: commit.committer ? commit.committer.login : null,
            committer_html_url: commit.committer ? commit.committer.html_url : null
          });
        }
      }
    );
  }

  private saveClients(clients: GithubContent[]): void {
    this.db.clear('github_clients').then(
      () => {
        for (const client of clients) {
          this.db.add('github_clients', {
            name: client.name
          });
        }
      }
    );
  }

  private saveHash(version: string, hash: string, key: number): void {
    this.db.delete('github_client_hashes', key - 2).then(
      () => {
        this.db.add('github_client_hashes', {
          // tslint:disable-next-line: object-literal-shorthand
          version: version,
          // tslint:disable-next-line: object-literal-shorthand
          hash: hash
        }, key - 2);
      }
    );
  }

  private async getSaveditems(objectStore: string): Promise<GithubFlat[] | GithubContentFlat[] | ClientHash> {
    return this.db.getAll(objectStore).then(
      (items) => {
        return items;
      },
      () => {
        return undefined;
      }
    );
  }

  private async getHash(key: number): Promise<HashReturn> {
    return this.db.getByKey('github_client_hashes', key - 2).then(
      (hash) => {
        if (typeof hash === 'undefined') {
          return undefined;
        }

        return hash;
      },
      () => {
        return undefined;
      }
    );
  }

  private async fetchCommits(databaseError: boolean): Promise<GithubFlat[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Github[]>(
        `${this.baseUrlApi}/repos/${this.user}/${this.repository}/commits`,
        { observe: 'response' })
        .pipe(
          take(1)
        )
        .subscribe((resp) => {
          if (!databaseError) {
            this.setLastModified(resp.headers, 1);
            this.saveCommits(resp.body);
          }

          resolve(GithubService.githubToGithubFlat(resp.body));
        }, () => reject());
    });
  }

  private async fetchClients(databaseError: boolean): Promise<GithubContentFlat[]> {
    return new Promise((resolve, reject) => {
      this.http.get<GithubContent[]>(
        `${this.baseUrlApi}/repos/${this.user}/${this.mavenRepository}/contents/${this.runelitPath}`,
        { observe: 'response' })
        .pipe(
          take(1)
        )
        .subscribe((resp) => {
          const clients = resp.body.filter((x) => x.type === 'dir');

          if (!databaseError) {
            this.setLastModified(resp.headers, 2);
            this.saveClients(clients);
          }

          resolve(GithubService.githubContentsToName(clients));
        }, () => reject());
    });
  }

  private async fetchHash(databaseError: boolean, version: string, url: string, key: number): Promise<HashReturn> {
    return new Promise((resolve, reject) => {
      this.http.get<GithubContentFile>(
        url,
        { observe: 'response' })
        .pipe(
          take(1)
        )
        .subscribe((resp) => {
          if (!databaseError) {
            this.setLastModified(resp.headers, key);
            this.saveHash(version, atob(resp.body.content.replace(/(\r\n|\n|\r)/gm, '')), key);
          }

          resolve({
            version,
            hash: atob(resp.body.content.replace(/(\r\n|\n|\r)/gm, ''))
          });
        }, () => reject());
    });
  }

  private async fetchCommitsConditionally(date: string): Promise<GithubFlat[]> {
    return new Promise((resolve, reject) => {
      const httpHeaders = new HttpHeaders({
        'If-Modified-Since': date
      });

      this.http.get<Github[]>(
        `${this.baseUrlApi}/repos/${this.user}/${this.repository}/commits`,
        { observe: 'response', headers: httpHeaders })
        .pipe(
          take(1)
        )
        .subscribe(async (resp) => {
          this.setLastModified(resp.headers, 1);
          this.saveCommits(resp.body);

          resolve(GithubService.githubToGithubFlat(resp.body));
        }, async (error: HttpErrorResponse) => {
          if (error.status === 304) {
            const savedCommits = await this.getSaveditems('github_commits');

            if (typeof savedCommits !== 'undefined') {
              resolve(savedCommits as GithubFlat[]);
            } else {
              this.fetchCommits(false).then(
                (data) => resolve(data)
              ).catch(() => reject());
            }

            reject();
          }

          reject();
        });
    });
  }

  private async fetchClientsConditionally(date: string): Promise<GithubContentFlat[]> {
    return new Promise((resolve, reject) => {
      const httpHeaders = new HttpHeaders({
        'If-Modified-Since': date
      });

      this.http.get<GithubContent[]>(
        `${this.baseUrlApi}/repos/${this.user}/${this.mavenRepository}/contents/${this.runelitPath}`,
        { observe: 'response', headers: httpHeaders })
        .pipe(
          take(1)
        )
        .subscribe(async (resp) => {
          this.setLastModified(resp.headers, 2);
          this.saveClients(resp.body);

          resolve(GithubService.githubContentsToName(resp.body));
        }, async (error: HttpErrorResponse) => {
          if (error.status === 304) {
            const savedClients = await this.getSaveditems('github_clients');

            if (typeof savedClients !== 'undefined') {
              resolve(savedClients as GithubContentFlat[]);
            } else {
              this.fetchClients(false).then(
                (data) => resolve(data)
              ).catch(() => reject());
            }

            reject();
          }

          reject();
        });
    });
  }

  private async fetchHashConditionally(date: string, version: string, url: string, key: number): Promise<HashReturn> {
    return new Promise((resolve, reject) => {
      const httpHeaders = new HttpHeaders({
        'If-Modified-Since': date
      });

      this.http.get<GithubContentFile>(
        url,
        { observe: 'response', headers: httpHeaders })
        .pipe(
          take(1)
        )
        .subscribe(async (resp) => {
          this.setLastModified(resp.headers, key);

          resolve({
            version,
            hash: atob(resp.body.content.replace(/(\r\n|\n|\r)/gm, ''))
          });
        }, async (error: HttpErrorResponse) => {
          if (error.status === 304) {
            const hash = await this.getHash(key);

            if (typeof hash !== 'undefined') {
              resolve(hash);
            } else {
              this.fetchHash(false, version, url, key).then(
                (data) => resolve(data)
              ).catch(() => reject());
            }

            reject();
          }

          reject();
        });
    });
  }

  public async getCommits(): Promise<GithubFlat[]> {
    return new Promise(async (resolve, reject) => {
      const databaseError = await this.openDatabase().then(
        () => {
          return false;
        }, () => {
          return true;
        }
      );

      if (!databaseError) {
        const date = await this.getLastmodified(1).then(
          (modifiedDate) => {
            return modifiedDate;
          }
        );

        if (typeof date === 'undefined') {
          this.fetchCommits(false)
            .then((data) => resolve(data))
            .catch(() => reject());
        } else {
          this.fetchCommitsConditionally(date)
            .then((data) => resolve(data))
            .catch(async () => {
              const savedCommits = await this.getSaveditems('github_commits');

              if (typeof savedCommits !== 'undefined') {
                resolve(savedCommits as GithubFlat[]);
              } else {
                reject();
              }
            });
        }
      } else {
        this.fetchCommits(true)
          .then((data) => resolve(data))
          .catch(() => reject());
      }
    });
  }

  private async getAllClients(): Promise<GithubContentFlat[]> {
    return new Promise(async (resolve, reject) => {
      const databaseError = await this.openDatabase().then(
        () => {
          return false;
        }, () => {
          return true;
        }
      );

      if (!databaseError) {
        const date = await this.getLastmodified(2).then(
          (modifiedDate) => {
            return modifiedDate;
          }
        );

        if (typeof date === 'undefined') {
          this.fetchClients(false)
            .then((data) => resolve(data))
            .catch(() => reject());
        } else {
          this.fetchClientsConditionally(date)
            .then((data) => resolve(data))
            .catch(async () => {
              const savedClients = await this.getSaveditems('github_clients');

              if (typeof savedClients !== 'undefined') {
                resolve(savedClients as GithubContentFlat[]);
              } else {
                reject();
              }
            });
        }
      } else {
        this.fetchClients(true)
          .then((data) => resolve(data))
          .catch(() => reject());
      }
    });
  }

  private async getClientHash(version: string, url: string, key: number): Promise<HashReturn> {
    return new Promise(async (resolve, reject) => {
      const databaseError = await this.openDatabase().then(
        () => {
          return false;
        }, () => {
          return true;
        }
      );

      if (!databaseError) {
        const date = await this.getLastmodified(key).then(
          (modifiedDate) => {
            return modifiedDate;
          }
        );

        if (typeof date === 'undefined') {
          this.fetchHash(false, version, url, key)
            .then((data) => resolve(data))
            .catch(() => reject());
        } else {
          this.fetchHashConditionally(date, version, url, key)
            .then((data) => resolve(data))
            .catch(async () => {
              const hash = await this.getHash(key);

              if (typeof hash !== 'undefined') {
                resolve(hash);
              } else {
                reject();
              }
            });
        }
      } else {
        this.fetchHash(false, version, url, key)
          .then((data) => resolve(data))
          .catch(() => reject());
      }
    });
  }

  private sortArrayMultiple(arr: GithubContentFlat[]): GithubContentFlat {
    return arr.sort((a, b) => {
      const itemA = a.name.split('.');
      const itemB = b.name.split('.');

      return Number(itemA[0]) - Number(itemB[0]) || Number(itemA[1]) - Number(itemB[1]) || Number(itemA[2]) - Number(itemB[2]);
    }).slice(-1)[0];
  }

  private buildUrls(clientVersion: string): GithubBuildLinks {
    const jarPath = `${this.runelitPath}/${clientVersion}/client-${clientVersion}.jar`;

    return {
      download_link: `${this.baseUrlRaw}/${this.user}/${this.mavenRepository}/master/${jarPath}`,
      md_link: `${this.baseUrlApi}/repos/${this.user}/${this.mavenRepository}/contents/${jarPath}.md5`,
      sha_link: `${this.baseUrlApi}/repos/${this.user}/${this.mavenRepository}/contents/${jarPath}.sha1`,
    };
  }

  public async getLatestClient(): Promise<LatestClient> {
    return new Promise(async (resolve, reject) => {
      this.getAllClients().then(
        async (data) => {
          const latestClient = this.sortArrayMultiple(data);
          const links = this.buildUrls(latestClient.name);

          const md = this.getClientHash(latestClient.name, links.md_link, 3);
          const sha = this.getClientHash(latestClient.name, links.sha_link, 4);

          resolve({
            download: links.download_link,
            version: latestClient.name,
            md5: md,
            sha1: sha
          });
        }
      );
    });
  }
}
