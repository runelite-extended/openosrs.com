import { Component, OnInit } from '@angular/core';

import { UpdateService } from '../../../services/update.service';
import { GoogleAnalyticsService } from '../../../services/google.analytics.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public style: string;

  constructor(
    private updateService: UpdateService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.updateService.checkForUpdates();
    this.googleAnalyticsService.init();
    this.titleService.setTitle('Runelite Plus');
  }

}
