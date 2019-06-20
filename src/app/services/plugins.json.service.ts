import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Plugins } from '../interfaces/plugins.interface';

@Injectable({
  providedIn: 'root'
})
export class PluginsJsonService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<Plugins[]> {
    return this.http.get<Plugins[]>('./assets/plugins/plugins.json');
  }
}
