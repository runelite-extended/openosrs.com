/// <reference path="../../../../../node_modules/@types/google.analytics/index.d.ts" />

import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from '@angular/router';

import {UpdateService} from '../../../services/update.service';
import {GoogleAnalyticsService} from '../../../services/google.analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public style: string;

  constructor(
    private updateService: UpdateService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) { }

  ngOnInit(): void {
    this.updateService.checkForUpdates();
    this.googleAnalyticsService.init();
  }

}
