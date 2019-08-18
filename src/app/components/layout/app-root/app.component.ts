import { Component, OnInit } from '@angular/core';

import { UpdateService } from '../../../services/update.service';
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
    private updateService: UpdateService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.updateService.checkForUpdates();
    this.googleAnalyticsService.init();
    this.metaService.updateTitle();

    const description = 'RuneLite Plus provides more functionality and less restrictions while staying open source. ' +
      'We have lots of custom RuneLite plugins!';

    this.metaService.updateTags([
      { name: 'keywords', content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins' },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'http://runelitepl.us/', property: true },
      { name: 'og:secure_url', content: 'https://runelitepl.us/', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);
  }
}
