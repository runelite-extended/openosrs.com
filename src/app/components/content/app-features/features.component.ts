import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';

import {Observable} from 'rxjs';

import {PluginsJsonService} from '../../../services/plugins.json.service';

import {Plugins} from '../../../interfaces/plugins.interface';
import {SharePluginComponent} from './app-share-plugin/share.plugin.component';
import {NotificationService} from '../../../services/notification.service';
import {Meta, Title} from '@angular/platform-browser';

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
    private titleService: Title,
    private metaTagService: Meta
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Runelite Plus: Features');
    this.metaTagService.updateTag({ name: 'description', content: 'Runelite Plus has a lot more features compared to RuneLite, zulrah helper, better runelite plugins, pvp plugins, pvm plugins and more. Use Runelite Plus over RuneLite!' });
    this.metaTagService.updateTag({ name: 'keywords', content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, updates, github updates' });
    this.plugins$ = this.pluginsJsonService.getJSON();
  }

  public openBottomSheet(plugin: Plugins): void {
    const sheet = this.matBottomSheet.open(SharePluginComponent, {
      data: { plugin },
    });

    sheet.afterDismissed().subscribe((data) => {
      if (typeof data !== 'undefined' && data.data === 'copy') {
        this.notificationService.showError(`${data.plugin.name} plugin link copied to the clipboard!`);
      }
    });
  }
}
