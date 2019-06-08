import {Component, OnInit} from '@angular/core';

import {Observable, of} from 'rxjs';

import {GithubService} from '../../../services/github.service';

import {Github} from '../../../interfaces/github.interface';
import {catchError} from 'rxjs/operators';
import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-features',
  templateUrl: './updates.component.pug',
  styleUrls: ['./updates.component.styl']
})
export class AppUpdatesComponent implements OnInit {

  private commits$: Observable<Github[]> | {};
  private fatalError = false;

  constructor(private githubService: GithubService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.commits$ = this.githubService.getCommits().pipe(
      catchError(() => {
        this.fatalError = true;
        this.notificationService.showError('The latest github commits could not be fetched.');
        return of({}); // return empty array
      })
    );
  }
}
