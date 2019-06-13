/// <reference path="../../../node_modules/@types/google.analytics/index.d.ts" />

import {Injectable} from '@angular/core';

import {WindowRef} from '../window.ref';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor(
    private windowRef: WindowRef
  ) {}

  public eventEmitter(
    eventCategory: string,
    eventAction: string,
    eventLabel: string = null,
    eventValue: number = null
  ) {
    this.windowRef.nativeWindow.ga('send', 'event', {
      eventCategory: eventCategory,
      eventLabel: eventLabel,
      eventAction: eventAction,
      eventValue: eventValue
    });
  }

}
