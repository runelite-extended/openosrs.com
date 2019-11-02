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

  private version = '2.1.9.1';

  public downloadUrl: string;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows x64';

  public hashes = [
    // Windows x64; md5, sha1
    [
      '8F0F64A533B1E9198A54877FF835D0D9',
      '3067CEF8B7B71B9D8C0BCCAFC0583E911287C89A',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup64.exe`
    ],

    // Windows x32; md5, sha1
    [
      'DED2675F0799EC52080D8078EC2DA6C7',
      'D0A03D661DC49A3AD5A60B450C7D2C7049D40B8B',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup32.exe`
    ],
    // MacOS; md5, sha1
    [
      'E6D189ACA9E73A92C5AB637FC5F3D40B',
      '0436DA6C468907B6D9AD1963409808865E91D421',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup.dmg`],

    // Linux; md5, sha1
    [
      'F56949F2DB901AB6797EF0CC740602B8',
      '7B1EF71DA01A29BB27997E0095CD0C7E699924D3',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRS.AppImage`
    ],

    // Jar; md5, sha1
    [
      '961AB6C3B9262993FA2102210F61F42E',
      '1D0A4226BC742261FE93DD13BE717EA9CF9A887F',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRS.jar`
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
        content: 'openosrs, open osrs, runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, download, downloads'
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
