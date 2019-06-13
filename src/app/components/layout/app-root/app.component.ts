/// <reference path="../../../../../node_modules/@types/google.analytics/index.d.ts" />

import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {UpdateService} from '../../../services/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private updateService: UpdateService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }

  ngOnInit(): void {
    this.updateService.checkForUpdates();
  }

}
