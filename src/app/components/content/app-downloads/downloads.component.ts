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
    ['B8842939DC4E218E15D7BADA13D680C8', 'FC0CBC5CF3E7CA0F80018E0BDB2AA8FE9BA42426'], // Windows; md5, sha1
    ['2C5DBA97E6BD779E595CFC793709C713', '688797BD689B036830016D47B02E660B82E7C609'], // MacOS; md5, sha1
    ['6B7FC3032C67B3240B9CF25EF7F6B1BC', '502D6622E272674AF943B8D831063B46EC614646']  // Jar; md5, sha1
  ];

  private selectedDownload: number;

  constructor(
    private notificationService: NotificationService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    const description = 'RunelitePlus has a lot more features compared to RuneLite, zulrah helper, ' +
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
