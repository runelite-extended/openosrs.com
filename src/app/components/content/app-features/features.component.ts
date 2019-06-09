import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';

import {Observable} from 'rxjs';

import {PluginsJsonService} from '../../../services/plugins.json.service';

import {Plugins} from '../../../interfaces/plugins.interface';
import {SharePluginComponent} from './app-share-plugin/share.plugin.component';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.pug',
  styleUrls: ['./features.component.scss']
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
    private matBottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.plugins$ = this.pluginsJsonService.getJSON();
  }

  public openBottomSheet(plugin: Plugins): void {
    const sheet = this.matBottomSheet.open(SharePluginComponent, {
      data: { plugin },
    });

    sheet.afterDismissed().subscribe((data) => {
      if (data.data === 'copy') {
        this.notificationService.showError(`${data.plugin.name} plugin link copied to the clipboard!`);
      }
    });
  }
}
