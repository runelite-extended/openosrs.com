import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Github} from '../interfaces/github.interface';

@Injectable()
export class GithubService {

  private baseUrl = 'https://api.github.com';
  private user = 'runelite-extended';
  private repository = 'runelite';

  constructor(private http: HttpClient) {
  }

  public getCommits(): Observable<Github[]> {
    return this.http.get<Github[]>(`${this.baseUrl}/repos/${this.user}/${this.repository}/commits`);
  }
}
