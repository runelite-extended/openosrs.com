/// <reference path="../../../node_modules/@types/google.analytics/index.d.ts" />

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  public static eventEmitter(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

}
