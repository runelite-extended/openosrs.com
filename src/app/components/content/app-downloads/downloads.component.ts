import { ChangeDetectionStrategy, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material';

import { NotificationService } from '../../../services/notification.service';
import { MetaService } from 'src/app/services/meta.service';

import { from } from 'rxjs';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDownloadsComponent implements OnInit {

  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  public downloadUrl: string;
  public hideHashes = true;
  public selectedOperatingSystem = 'Windows';
  public hashes = [
    ['b8842939dc4e218e15d7bada13d680c8', 'fc0cbc5cf3e7ca0f80018e0bdb2aa8fe9ba42426'],
    ['2c5dba97e6bd779e595cfc793709c713', '688797bd689b036830016d47b02e660b82e7c609'],
    ['8f85e5d2c329449bdb64a95ac577f6c4', '5e6d293ccb27f278fc2a435415dc64f42ad1462f']
  ];

  private selectedDownload: number;

  constructor(
    private notificationService: NotificationService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    const description = 'Runelite Plus has a lot more features compared to RuneLite, zulrah helper, ' +
      'improved runelite plugins, pvp plugins, pvm plugins and more. Use Runelite Plus over RuneLite!';

    this.metaService.updateTags([
      {
        name: 'keywords',
        content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins, download, downloads'
      },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://runelitepl.us/downloads', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);
  }

  public getHash(item: number): string {
    if (!this.hideHashes) {
      if (this.selectedOperatingSystem === 'Windows' && this.selectedDownload === 0) {
        return this.hashes[0][item];
      } else if (this.selectedOperatingSystem === 'MacOS' && this.selectedDownload === 0) {
        return this.hashes[1][item];
      }
      return this.hashes[2][item];
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
