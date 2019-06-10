import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {MatBottomSheet} from '@angular/material';

import {ShareUpdateComponent} from '../app-share-plugin/share.update.component';

import {UpdatesJsonService} from '../../../../services/updates.service';
import {NotificationService} from '../../../../services/notification.service';

import {Updates} from '../../../../interfaces/updates.interface';

@Component({
  selector: 'app-full-post',
  templateUrl: './full.post.component.html',
  styleUrls: ['./full.post.component.scss'],
})
export class AppFullPostComponent {

  public update: Updates = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private updatesJsonService: UpdatesJsonService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.updatesJsonService.getJSON().subscribe((data: Updates[]) => {
        for (const update of data) {
          if (update.mdFile === params.name) {
            this.update = update;

            this.titleService.setTitle(`Runelite Plus: ${update.title}`);
            this.metaTagService.updateTag({ name: 'description', content: update.title });
            this.metaTagService.updateTag({ name: 'keywords', content: `runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, ${update.categories.join(', ')}, ${update.tags.join(', ')}` });
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
      if (data.data === 'copy') {
        this.notificationService.showError('Update link copied to the clipboard!');
      }
    });
  }
}
