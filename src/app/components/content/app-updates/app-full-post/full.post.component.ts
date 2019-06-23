import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';

import { ShareUpdateComponent } from '../app-share-plugin/share.update.component';

import { UpdatesJsonService } from '../../../../services/updates.service';
import { NotificationService } from '../../../../services/notification.service';
import { GoogleAnalyticsService } from '../../../../services/google.analytics.service';

import { Updates } from '../../../../interfaces/updates.interface';

import { take } from 'rxjs/operators';
import { MetaService } from 'src/app/services/meta.service';

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
    private changeDetectorRef: ChangeDetectorRef,
    private googleAnalyticsService: GoogleAnalyticsService,
    private metaService: MetaService
  ) {
    this.activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.updatesJsonService.getJSON().pipe(take(1)).subscribe((data: Updates[]) => {
        for (const update of data) {
          if (update.mdFile === params.name) {
            this.update = update;

            this.metaService.updateTitle(`Runelite Plus: ${update.title}`);
            this.metaService.updateTags([
              {
                name: 'keywords',
                content: `runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, ` +
                  `runelite plugins, ${update.categories.join(', ')}, ${update.tags.join(', ')}`
              },
              { name: 'description', content: update.title },
              { name: 'twitter:description', content: update.title },
              { name: 'og:url', content: 'http://runelitepl.us/updates', property: true },
              { name: 'og:secure_url', content: 'https://runelitepl.us/updates', property: true },
              { name: 'og:type', content: 'website', property: true },
              { name: 'og:description', content: update.title, property: true },
            ]);

            this.metaService.addArticleTags(update.date.slice(0, -1), update.title);

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
