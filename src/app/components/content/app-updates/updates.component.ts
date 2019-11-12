import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

import { ShareUpdateComponent } from './app-share-plugin/share.update.component';

import { GithubService } from '../../../services/github.service';
import { UpdatesJsonService } from '../../../services/updates.service';
import { NotificationService } from '../../../services/notification.service';
import { GoogleAnalyticsService } from '../../../services/google.analytics.service';
import { MetaService } from 'src/app/services/meta.service';

import { GithubFlat } from '../../../interfaces/github.interface';
import { Updates } from '../../../interfaces/updates.interface';

import { Observable, of, Subscription, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-features',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUpdatesComponent implements OnInit, OnDestroy {

  public commits: GithubFlat[];
  public updates$: Observable<Updates[]> | {};
  public fatalPostError = false;
  public fatalGithubError = false;

  private githubOb: Subscription;

  constructor(
    private updatesJsonService: UpdatesJsonService,
    private githubService: GithubService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService,
    private googleAnalyticsService: GoogleAnalyticsService,
    private changeDetectorRef: ChangeDetectorRef,
    private metaService: MetaService
  ) { }

  ngOnInit() {
    const description = 'Updates for OpenOSRS Client, we push more updates than RuneLite!';
    this.metaService.createCanonicalURL();
    this.metaService.updateTags([
      {
        name: 'keywords',
        content: 'runelite, OpenOSRS, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, updates, github updates'
      },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://openosrs.com/updates', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);

    this.updates$ = this.updatesJsonService.getJSON().pipe(
      catchError(() => {
        this.fatalPostError = true;
        this.notificationService.showError('The latest update posts could not be fetched.');

        this.changeDetectorRef.detectChanges();

        return of({}); // return empty array
      })
    );

    this.githubOb = from(
      this.githubService.getCommits()
    ).subscribe((commits) => {
      commits.shift();
      this.commits = commits;
      this.changeDetectorRef.detectChanges();
    }, () => {
      this.fatalGithubError = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.githubOb.unsubscribe();
  }

  public openBottomSheet(update: Updates): void {
    const sheet = this.matBottomSheet.open(ShareUpdateComponent, {
      data: { update },
    });

    sheet.afterDismissed().subscribe((data) => {
      if (typeof data !== 'undefined' && data.data === 'copy') {
        this.notificationService.showError('Update link copied to the clipboard!');
      } else {
        this.googleAnalyticsService.event('shareUpdateMenu', {
          event_category: 'closeShareMenu',
          event_label: 'Closing share menu',
          value: 1
        });
      }
    });
  }
}
