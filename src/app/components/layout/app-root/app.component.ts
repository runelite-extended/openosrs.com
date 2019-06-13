/// <reference path="../../../../../node_modules/@types/google.analytics/index.d.ts" />

import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {UpdateService} from '../../../services/update.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public style: string;

  constructor(
    private updateService: UpdateService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.style = getComputedStyle(document.documentElement).getPropertyValue('content');
    if (this.style === 'dark') {
      this.renderer.addClass(document.body, "runelite-plus-dark-theme");
    }

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
