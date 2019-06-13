/// <reference path="../../../../../node_modules/@types/google.analytics/index.d.ts" />

import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {UpdateService} from '../../../services/update.service';
import {ThemeService} from '../../../services/theme.service';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @HostBinding('class.runelite-plus-dark-theme') theme: boolean;

  private themeSubscription: Subscription;

  constructor(
    private updateService: UpdateService,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    if (themeService.getTheme() === 'dark') {
      this.theme = true;
    }
  }

  ngOnInit(): void {
    this.updateService.checkForUpdates();

    this.themeSubscription = this.themeService.change.subscribe((theme) => {
      this.theme = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
