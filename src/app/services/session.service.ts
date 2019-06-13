import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {
  }

  public getSessionCount(): Observable<string> {
    const headers = new HttpHeaders({'ngsw-bybass': 'true'});
    return this.http.get('https://session.runelitepl.us/count', {headers: headers, responseType: 'text'});
  }
}
