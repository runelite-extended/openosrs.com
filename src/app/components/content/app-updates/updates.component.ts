import {Component, OnInit} from '@angular/core';

import {Observable, of} from 'rxjs';

import {GithubService} from '../../../services/github.service';

import {Github} from '../../../interfaces/github.interface';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../../../services/notification.service';
import {Updates} from '../../../interfaces/updates.interface';
import {UpdatesJsonService} from '../../../services/updates.service';
import {MatBottomSheet} from '@angular/material';
import {ShareUpdateComponent} from './app-share-plugin/share.update.component';

@Component({
  selector: 'app-features',
  templateUrl: './updates.component.pug',
  styleUrls: ['./updates.component.scss']
})
export class AppUpdatesComponent implements OnInit {

  public commits$: Observable<Github[]> | {};
  public updates$: Observable<Updates[]>;
  public fatalError = false;

  constructor(
    private updatesJsonService: UpdatesJsonService,
    private githubService: GithubService,
    private matBottomSheet: MatBottomSheet,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
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
      if (data.data === 'copy') {
        this.notificationService.showError('Update link copied to the clipboard!');
      }
    });
  }
}
