import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {
  }

  public getSessionCount(): Observable<string> {
    return this.http.get('https://session.openosrs.com/count', { responseType: 'text' });
  }
}
