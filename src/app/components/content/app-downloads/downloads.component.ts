import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatStepper } from '@angular/material';

import { NotificationService } from '../../../services/notification.service';
import { MetaService } from 'src/app/services/meta.service';
import { GithubService} from '../../../services/github.service';

import { Jar, Linux, Macos, Windowsx32, Windowsx64 } from '../../../interfaces/github.interface';

import { from, Subscription } from 'rxjs';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDownloadsComponent implements OnInit, OnDestroy {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  private version: string;

  public fatalGithubError = false;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows x64';

  public windowsx64: Windowsx64;
  public windowsx32: Windowsx32;
  public macos: Macos;
  public linux: Linux;
  public jar: Jar;

  private selectedDownload: number;
  private githubOb: Subscription;

  constructor(
    private notificationService: NotificationService,
    private metaService: MetaService,
    private githubService: GithubService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const description = 'OpenOSRS client download for windows mac and linux.';
    this.metaService.createCanonicalURL();
    this.metaService.updateTags([
      {
        name: 'keywords',
        content: 'openosrs, open osrs, runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, download, downloads'
      },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://openosrs.com/downloads', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);

    this.githubOb = from(
      this.githubService.getLaunchers()
    ).subscribe((launchers) => {
      this.version = launchers.version;
      this.windowsx64 = launchers.windowsx64;
      this.windowsx32 = launchers.windowsx32;
      this.macos = launchers.macos;
      this.linux = launchers.linux;
      this.jar = launchers.jar;

      this.changeDetectorRef.detectChanges();
    }, () => {
      this.fatalGithubError = true;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.githubOb.unsubscribe();
  }

  public getHash(item: number): string {
    if (!this.hideHashes) {
      let hashes: Windowsx64 | Windowsx32 | Macos | Linux | Jar;
      if (this.selectedDownload === 1) {
        hashes = this.jar;
      } else {
        if (this.selectedOperatingSystem === 'Windows x64') {
          hashes = this.windowsx64;
        } else if (this.selectedOperatingSystem === 'Windows x32') {
          hashes = this.windowsx32;
        } else if (this.selectedOperatingSystem === 'MacOS') {
          hashes = this.macos;
        } else if (this.selectedOperatingSystem === 'Linux') {
          hashes = this.linux;
        }
      }

      return item === 0 ? hashes.md5 : hashes.sha1;
    }
  }

  public getDownload(item: number): string {
    const baseUrl = `https://github.com/open-osrs/launcher/releases/download/${this.version}`;
    if (item === 1) {
      return `${baseUrl}/OpenOSRS.jar`;
    } else {
      if (this.selectedOperatingSystem === 'Windows x64') {
        return `${baseUrl}/OpenOSRSSetup64.exe`;
      } else if (this.selectedOperatingSystem === 'Windows x32') {
        return `${baseUrl}/OpenOSRSSetup32.exe`;
      } else if (this.selectedOperatingSystem === 'MacOS') {
        return `${baseUrl}/OpenOSRSSetup.dmg`;
      } else if (this.selectedOperatingSystem === 'Linux') {
        return `${baseUrl}/OpenOSRS.AppImage`;
      }
    }
  }

  public downloadClick(item: number): void {
    this.selectedDownload = item;

    this.stepper.selected.completed = true;
    this.stepper.next();

    this.hideHashes = false;

    this.notificationService.showError('Starting download, please wait!');
  }
}
