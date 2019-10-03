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

  private version = '2.1.5.0-2';

  public downloadUrl: string;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows x64';

  public hashes = [
    // Windows x64; md5, sha1
    [
      '2FA4E25DC979F2CFD218A12D111D91E5',
      'F0D2FE8BF266838F0E204B3AD6E09C93B603F01B',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/RuneLitePlusSetup64.exe`
    ],

    // Windows x32; md5, sha1
    [
      'D6C2CC7B5F8BA2463C00A5CF63518545',
      'F76F15C8A9248C1DED56F4D6BEE893564A45A91C',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/RuneLitePlusSetup32.exe`
    ],
    // MacOS; md5, sha1
    ['', '', ''],

    // Linux; md5, sha1
    [
      '4577724EC7620DDF65DC72FB495C0534',
      '4E01F105FB1F7B24FD173F943CF57175EF8943D7',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/RuneLitePlus.AppImage`
    ],

    // Jar; md5, sha1
    [
      '7DBC60820058E4687B50193EFADB3CFB',
      '5CF9D8F068DE993EDE20EF308308718D860E9C3A',
      `https://github.com/runelite-extended/launcher/releases/download/${this.version}/RuneLitePlus.jar`
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
