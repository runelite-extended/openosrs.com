import { HashReturn } from './../../../interfaces/github.interface';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';

import { NotificationService } from '../../../services/notification.service';
import { GithubService } from 'src/app/services/github.service';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class AppDownloadsComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  public downloadUrl: string;
  public md5hash: HashReturn;
  public fatalMdError = false;
  public sha1hash: HashReturn;
  public fatalShaError = false;

  private clientVersion: string;
  private selectedDownload: number;

  public hideHashes = true;
  public selectedOperatingSystem = 'Windows';

  constructor(
    private notificationService: NotificationService,
    private githubService: GithubService,
  ) {
  }

  ngOnInit(): void {
    this.githubService.getLatestClient().then(
      (client) => {
        this.downloadUrl = client.download;
        this.clientVersion = client.version;

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

  public getHash(item: number): string {
    if (!this.hideHashes) {
      if (this.selectedDownload === 0) {
        if (item === 0) {
          return 'b8842939dc4e218e15d7bada13d680c8';
        } else if (item === 1) {
          return 'fc0cbc5cf3e7ca0f80018e0bdb2aa8fe9ba42426';
        }
      } else {
        if (item === 0) {
          if (this.fatalMdError || this.clientVersion !== this.md5hash.version) {
            return 'MD5 hash could not be fetched.';
          } else {
            return this.md5hash.hash;
          }
        } else if (item === 1) {
          if (this.fatalShaError || this.clientVersion !== this.sha1hash.version) {
            return 'SHA1 hash could not be fetched.';
          } else {
            return this.sha1hash.hash;
          }
        }
      }
    }
  }

  public downloadClick(item: number): void {
    if (item === 0 && this.selectedOperatingSystem !== 'Windows') {
      return;
    }

    this.selectedDownload = item;

    this.stepper.selected.completed = true;
    this.stepper.next();

    this.hideHashes = false;

    this.notificationService.showError('Starting download, please wait!');
  }
}
