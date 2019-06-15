import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatBottomSheet, MatIconRegistry} from '@angular/material';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';

import {PluginsJsonService} from '../../../services/plugins.json.service';
import {NotificationService} from '../../../services/notification.service';

import {Plugins} from '../../../interfaces/plugins.interface';

import {Observable} from 'rxjs';

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
    private notificationService: NotificationService,
    private matBottomSheet: MatBottomSheet,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Runelite Plus: Features');
    this.metaTagService.updateTag({ name: 'description', content: 'Runelite Plus has a lot more features compared to RuneLite, zulrah helper, better runelite plugins, pvp plugins, pvm plugins and more. Use Runelite Plus over RuneLite!' });
    this.metaTagService.updateTag({ name: 'keywords', content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, updates, github updates' });

    this.plugins$ = this.pluginsJsonService.getJSON();

    this.matIconRegistry.addSvgIcon('times', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/times-solid.svg'));
  }
}
