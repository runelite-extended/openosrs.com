import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { NgxIndexedDBService } from 'ngx-indexed-db';

import {
  GithubContent,
  GithubContentFlat, Launchers
} from '../interfaces/github.interface';
import { Github, GithubFlat } from '../interfaces/github.interface';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private baseUrlApi = 'https://api.github.com';
  private user = 'open-osrs';
  private repository = 'runelite';
  private launcherRepository = 'launcher';

  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService
  ) {
    this.dbService.currentStore = 'github_commits';
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

  private async getLastmodified(key: number): Promise<string> {
    return this.dbService.getByID(key).then(
      (modified) => {
        if (typeof modified === 'undefined') {
          return undefined;
        }

        // @ts-ignore
        return modified.update;
      },
      () => {
        return undefined;
      }
    );
  }

  private setLastModified(headers: HttpHeaders, key: number): void {
    if (typeof headers !== 'undefined' && typeof headers.get('Last-Modified') !== 'undefined') {
      this.dbService.deleteRecord(key).then(
        () => {
          this.dbService.add({
            id: key,
            update: headers.get('Last-Modified'),
          });
        }
      );
    }
  }

  private saveCommits(commits: Github[]): void {
    this.dbService.clear().then(
      () => {
        commits.forEach((commit, index) => {
          this.dbService.add({
            id: index,
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
        });
      }
    );
  }

  private async getSavedCommits(): Promise<GithubFlat[]> {
    return this.dbService.getAll().then(
      (items) => {
        return items;
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
            this.setLastModified(resp.headers, -1);
            this.saveCommits(resp.body);
          }

          resolve(GithubService.githubToGithubFlat(resp.body));
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
          this.setLastModified(resp.headers, -1);
          this.saveCommits(resp.body);

          resolve(GithubService.githubToGithubFlat(resp.body));
        }, async (error: HttpErrorResponse) => {
          if (error.status === 304) {
            const savedCommits = await this.getSavedCommits();

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

  public async getCommits(): Promise<GithubFlat[]> {
    return new Promise(async (resolve, reject) => {
      const date = await this.getLastmodified(-1).then(
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
            const savedCommits = await this.getSavedCommits();

            if (typeof savedCommits !== 'undefined') {
              resolve(savedCommits as GithubFlat[]);
            } else {
              reject();
            }
          });
      }
    });
  }

  public async getLaunchers(): Promise<Launchers> {
    return new Promise((resolve, reject) => {
      this.http.get<GithubContent>(
        `${this.baseUrlApi}/repos/${this.user}/${this.launcherRepository}/contents/version.json`,
        { observe: 'response' })
        .pipe(
          take(1)
        )
        .subscribe((resp) => {
          // @ts-ignore
          resolve(JSON.parse(atob(resp.body.content)));
        }, () => reject());
    });
  }
}
