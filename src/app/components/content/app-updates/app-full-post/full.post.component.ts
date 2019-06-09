import {Component, Input, OnInit} from '@angular/core';
import {Updates} from '../../../../interfaces/updates.interface';
import {ActivatedRoute} from '@angular/router';
import {UpdatesJsonService} from '../../../../services/updates.service';
import {ShareUpdateComponent} from '../app-share-plugin/share.update.component';
import {GithubService} from '../../../../services/github.service';
import {MatBottomSheet} from '@angular/material';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full.post.component.pug',
  styleUrls: ['./full.post.component.scss'],
})
export class AppFullPostComponent {

  public update: Updates = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private updatesJsonService: UpdatesJsonService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.updatesJsonService.getJSON().subscribe((data: Updates[]) => {
        for (const update of data) {
          if (update.mdFile === params.name) {
            this.update = update;
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
