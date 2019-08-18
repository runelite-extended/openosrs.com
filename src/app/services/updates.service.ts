import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Updates } from '../interfaces/updates.interface';

@Injectable({
  providedIn: 'root'
})
export class UpdatesJsonService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<Updates[]> {
    return this.http.get<Updates[]>('./assets/posts/posts.json');
  }
}
