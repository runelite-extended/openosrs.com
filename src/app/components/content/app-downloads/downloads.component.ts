import { HashReturn } from './../../../interfaces/github.interface';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../services/notification.service';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDownloadsComponent implements OnInit {

  public md5hash: HashReturn;
  public fatalMdError = false;
  public sha1hash: HashReturn;
  public fatalShaError = false;

  constructor(
    private notificationService: NotificationService,
    private githubService: GithubService,
  ) {
  }

  ngOnInit(): void {
    this.githubService.getLatestClient().then(
      (client) => {
        client.md5
        .then((data) => this.md5hash = data)
        .catch(() => this.fatalMdError = true);

        client.sha1
        .then((data) => this.sha1hash = data)
        .catch(() => this.fatalShaError = true);
      }
    ).catch(
      () => {
        console.log('oei');
      }
    );
  }
}
