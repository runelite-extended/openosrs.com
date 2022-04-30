import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  GithubContent,
  Launchers
} from '../interfaces/github.interface';

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
  ) {
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
