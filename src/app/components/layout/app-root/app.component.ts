import { Component, OnInit } from '@angular/core';

import { GoogleAnalyticsService } from '../../../services/google.analytics.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  public style: string;

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.googleAnalyticsService.init();
    this.metaService.updateTitle();

    const description = 'OpenOSRS provides more functionality and less restrictions while staying open source.';

    this.metaService.updateTags([
      { name: 'keywords', content: 'runelite, OpenOSRS, Open OSRS, runelite pvp plugins, runelite pvp, runelite plugins' },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'http://openosrs.com/', property: true },
      { name: 'og:secure_url', content: 'https://openosrs.com/', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);
  }
}
