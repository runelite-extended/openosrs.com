import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {MatBottomSheet, MatIconRegistry} from '@angular/material';

import {ShareUpdateComponent} from './app-share-plugin/share.update.component';

import {GithubService} from '../../../services/github.service';
import {UpdatesJsonService} from '../../../services/updates.service';
import {NotificationService} from '../../../services/notification.service';

import {Github} from '../../../interfaces/github.interface';
import {Updates} from '../../../interfaces/updates.interface';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {GoogleAnalyticsService} from '../../../services/google.analytics.service';

@Component({
  selector: 'app-features',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUpdatesComponent implements OnInit {

  public commits$: Observable<Github[]> | {};
  public updates$: Observable<Updates[]>;
  public fatalError = false;

  constructor(
    private updatesJsonService: UpdatesJsonService,
    private githubService: GithubService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService,
    private titleService: Title,
    private metaTagService: Meta,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Runelite Plus: Updates');
    this.metaTagService.updateTag({ name: 'description', content: 'RuneLitePlus provides more functionality and less restrictions while staying open source. We have lots of RuneLite Plus plugins!' });
    this.metaTagService.updateTag({ name: 'keywords', content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, updates, github updates' });

    this.updates$ = this.updatesJsonService.getJSON();
    this.commits$ = this.githubService.getCommits().pipe(
      catchError(() => {
        this.fatalError = true;
        this.notificationService.showError('The latest github commits could not be fetched.');
        return of({}); // return empty array
      })
    );
  }

  public openBottomSheet(update: Updates): void {
    const sheet = this.matBottomSheet.open(ShareUpdateComponent, {
      data: { update },
    });

    sheet.afterDismissed().subscribe((data) => {
      if (typeof data !== 'undefined' && data.data === 'copy') {
        this.notificationService.showError('Update link copied to the clipboard!');
      } else if (typeof data === 'undefined') {
        this.googleAnalyticsService.event("shareUpdateMenu", {
          'event_category': "closeShareMenu",
          'event_label': "Closing share menu",
          'value': 1
        });
      }
    });
  }
}
