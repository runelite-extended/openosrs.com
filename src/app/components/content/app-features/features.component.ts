import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { PluginsJsonService } from '../../../services/plugins.json.service';
import { MetaService } from 'src/app/services/meta.service';

import { Plugins } from '../../../interfaces/plugins.interface';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFeaturesComponent implements OnInit {

  public plugins$: Observable<Plugins[]>;
  public filter = '';
  public selectedCategory = 'All';
  public categories = [
    'All',
    'PvM',
    'PvP',
    'Skilling',
    'Utility'
  ];

  constructor(
    private pluginsJsonService: PluginsJsonService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private metaService: MetaService
  ) { }

  ngOnInit() {
    const description = 'RunelitePlus has a lot more features compared to RuneLite, zulrah helper, ' +
      'improved runelite plugins, pvp plugins, pvm plugins and more. Use Runelite Plus over RuneLite!';

    this.metaService.updateTags([
      {
        name: 'keywords',
        content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, zulrah, vorkath'
      },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://runelitepl.us/features', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);

    this.plugins$ = this.pluginsJsonService.getJSON();

    this.matIconRegistry.addSvgIcon('times', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/times-solid.svg'));
  }
}
