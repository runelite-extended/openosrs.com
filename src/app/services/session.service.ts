import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {
  }

  public getSessionCount(): Observable<string> {
    return this.http.get<string>('https://session.runelitepl.us/count');
  }
}
