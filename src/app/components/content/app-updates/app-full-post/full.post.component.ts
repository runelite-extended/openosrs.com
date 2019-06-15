import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material';

import {ShareUpdateComponent} from '../app-share-plugin/share.update.component';

import {UpdatesJsonService} from '../../../../services/updates.service';
import {NotificationService} from '../../../../services/notification.service';
import {GoogleAnalyticsService} from '../../../../services/google.analytics.service';

import {Updates} from '../../../../interfaces/updates.interface';

import {take} from 'rxjs/operators';

@Component({
  selector: 'app-full-post',
  templateUrl: './full.post.component.html',
  styleUrls: ['./full.post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFullPostComponent {

  public update: Updates = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private updatesJsonService: UpdatesJsonService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService,
    private titleService: Title,
    private metaTagService: Meta,
    private changeDetectorRef: ChangeDetectorRef,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.activatedRoute.params.pipe(take(1)).subscribe( params => {
      this.updatesJsonService.getJSON().pipe(take(1)).subscribe((data: Updates[]) => {
        for (const update of data) {
          if (update.mdFile === params.name) {
            this.update = update;

            this.titleService.setTitle(`Runelite Plus: ${update.title}`);
            this.metaTagService.updateTag({ name: 'description', content: update.title });
            this.metaTagService.updateTag({ name: 'keywords', content: `runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, ${update.categories.join(', ')}, ${update.tags.join(', ')}` });

            this.changeDetectorRef.detectChanges();
          }
        }
      });
    });
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
