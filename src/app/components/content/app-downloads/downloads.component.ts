import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';

import { NotificationService } from '../../../services/notification.service';
import { MetaService } from 'src/app/services/meta.service';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDownloadsComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  private version = '2.1.6.0';

  public downloadUrl: string;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows x64';

  public hashes = [
    // Windows x64; md5, sha1
    [
      'E1CDDAF65C11813B14C854D8ADE67CCA',
      'A97064827688FEDFFD1728EC977DF32BE160077B',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/OpenOSRSSetup64.exe`
    ],

    // Windows x32; md5, sha1
    [
      '9F69B09CCA7151A2E4389A5F8A226E8F',
      'D12C3743B72E043026656C2984386EB1E1FB939F',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/OpenOSRSSetup32.exe`
    ],
    // MacOS; md5, sha1
    [
      '3BBF416DBB817607C6CFC184DDFC6451',
      '04A0558BE06264E8AB078657E9F1AADE966F47D7',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/OpenOSRSSetup.dmg`],

    // Linux; md5, sha1
    [
      'F9F9096AFBF0E4B5A5233713D927CD70',
      'DF73B1C16506D3FC7FF8B1948800875B35B78B60',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/OpenOSRS.AppImage`
    ],

    // Jar; md5, sha1
    [
      'BDA49C77262CB61C81ACA88282EA638C',
      '3031D49F95E37E6E18DC19ABE1F26C2798DF7BA4',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/OpenOSRS.jar`
    ]
  ];

  private selectedDownload: number;

  constructor(
    private notificationService: NotificationService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    const description = 'Open-source client for Old School RuneScape with more functionality and less restrictions.';

    this.metaService.updateTags([
      {
        name: 'keywords',
        content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, download, downloads'
      },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://openosrs.com/downloads', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);
  }

  public getHash(item: number): string {
    if (!this.hideHashes) {
      if (this.selectedDownload === 1) {
        return this.hashes[4][item];
      } else {
        if (this.selectedOperatingSystem === 'Windows x64') {
          return this.hashes[0][item];
        } else if (this.selectedOperatingSystem === 'Windows x32') {
          return this.hashes[1][item];
        } else if (this.selectedOperatingSystem === 'MacOS') {
          return this.hashes[2][item];
        } else if (this.selectedOperatingSystem === 'Linux') {
          return this.hashes[1][item];
        }
      }
    }
  }

  public getDownload(item: number): string {
    if (item === 1) {
      return this.hashes[4][2];
    } else {
      if (this.selectedOperatingSystem === 'Windows x64') {
        return this.hashes[0][2];
      } else if (this.selectedOperatingSystem === 'Windows x32') {
        return this.hashes[1][2];
      } else if (this.selectedOperatingSystem === 'MacOS') {
        return this.hashes[2][2];
      } else if (this.selectedOperatingSystem === 'Linux') {
        return this.hashes[3][2];
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
