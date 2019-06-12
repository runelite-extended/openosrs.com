import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatIconRegistry} from '@angular/material';

import {GoogleAnalyticsService} from '../../../../services/google.analytics.service';

import {Updates} from '../../../../interfaces/updates.interface';

@Component({
  selector: 'app-share-plugin',
  templateUrl: './share.update.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareUpdateComponent implements OnInit {

  public update: Updates;

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<ShareUpdateComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {update: Updates},
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry,
    public googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.update = data.update;

    this.googleAnalyticsService.eventEmitter("shareUpdateMenu", "openShareUpdateMenu", "Opening share menu", 1);
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/facebook-square-brands.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    this.matIconRegistry.addSvgIcon('email', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/at-solid.svg'));
    this.matIconRegistry.addSvgIcon('copy', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/copy-solid.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/window-close-solid.svg'));
  }

  public openLink(service: number): void {
    this.matBottomSheetRef.dismiss({ plugin: this.update, data: 'share' });

    let eventLabel: string;

    if (service === 1) {
      eventLabel = "Facebook";
    } else if (service === 2) {
      eventLabel = "Twitter";
    } else {
      eventLabel = "Email";
    }

    this.googleAnalyticsService.eventEmitter("shareUpdateMenu", `share${eventLabel}`, `Sharing plugin to ${eventLabel}`, 1);
  }

  public copyLink(event: MouseEvent): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `https://runelitepl.us/updates/${this.update.mdFile}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    event.preventDefault();

    this.matBottomSheetRef.dismiss({ plugin: this.update, data: 'copy' });
    this.googleAnalyticsService.eventEmitter("shareUpdateMenu", "copyLink", "Copy share link to clipboard", 1);
  }

  public close(event: MouseEvent): void {
    event.preventDefault();
    this.matBottomSheetRef.dismiss();
  }
}
