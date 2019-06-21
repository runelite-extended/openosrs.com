import { HashReturn } from './../../../interfaces/github.interface';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { NotificationService } from '../../../services/notification.service';
import { GithubService } from 'src/app/services/github.service';
import { MatStepper } from '@angular/material';
import { from } from 'rxjs';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDownloadsComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  public downloadUrl: string;
  public md5hash: HashReturn;
  public fatalMdError = false;
  public sha1hash: HashReturn;
  public fatalShaError = false;
  public clientVersion: string;

  private selectedDownload: number;

  public hideHashes = true;
  public selectedOperatingSystem = 'Windows';

  private obs = [];

  constructor(
    private notificationService: NotificationService,
    private githubService: GithubService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    const obs = from(
      this.githubService.getLatestClient()
    ).subscribe((client) => {
      this.downloadUrl = client.download;
      this.clientVersion = client.version;

      const md5obs = from(
        client.md5
      ).subscribe((data) => {
        this.md5hash = data;
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.fatalMdError = true;
        this.changeDetectorRef.detectChanges();
      });

      const sha1obs = from(
        client.sha1
      ).subscribe((data) => {
        this.sha1hash = data;
        this.changeDetectorRef.detectChanges();
      }, () => {
        this.fatalShaError = true;
        this.changeDetectorRef.detectChanges();
      });

      this.obs.push(md5obs);
      this.obs.push(sha1obs);
    });


    this.obs.push(obs);
  }

  ngOnDestroy(): void {
    for (const ob of this.obs) {
      ob.unsubscribe();
    }
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
