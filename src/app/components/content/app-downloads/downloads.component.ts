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

  private version = '2.1.9.0';

  public downloadUrl: string;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows x64';

  public hashes = [
    // Windows x64; md5, sha1
    [
      '9C948174EE64DF8757608A0712BA3257',
      '5F3A036D1F7C1360023A5B4EE55165C92BFD40E5',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup64.exe`
    ],

    // Windows x32; md5, sha1
    [
      '38D656C817FE6619AF6FA4ED403CFA79',
      '0C451CBA2D2D90FA7AE9DCD69F258658CA51FC8B',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup32.exe`
    ],
    // MacOS; md5, sha1
    [
      '98B00DAF2CA4811786E1A01DDC7E9D6A',
      '902AB74A7C5FE7DB43B25887F275CA340666B1EC',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRSSetup.dmg`],

    // Linux; md5, sha1
    [
      'CC7CEA4191295FFC1BBE1ED77317DADE',
      'B4007D1B7B86B8A8C8B47A52F9F91AFBD8944D4F',
      `https://github.com/open-osrs/launcher/releases/download/${this.version}/OpenOSRS.AppImage`
    ],

    // Jar; md5, sha1
    [
      '7D1CB0B7A4B72A27091E5D15838CEAC6',
      '07DB92E251C5B1528108669CEEDDC833B327B7D8',
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
