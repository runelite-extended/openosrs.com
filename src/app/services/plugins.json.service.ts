import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {Plugins} from '../interfaces/plugins.interface';

@Injectable()
export class PluginsJsonService {

  constructor(private http: HttpClient) { }

  public getJSON(): Observable<Plugins[]> {
    return this.http.get<Plugins[]>('./assets/plugins/plugins.json');
  }

  public randomNumbers(range: number, tot: number) {
    if (tot > range) {
      return [];
    }

    const randomNumbers = [];

    for (let i = 0; i < tot; i++) {
      let randN = Math.floor(Math.random() * range);

      while (randomNumbers.includes(randN)) {
        randN = Math.floor(Math.random() * range);
      }

      randomNumbers.push(randN);
    }

    return randomNumbers;
  }
}
