import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatIconRegistry} from '@angular/material';

import {Updates} from '../../../../interfaces/updates.interface';

@Component({
  selector: 'app-share-plugin',
  templateUrl: './share.update.component.pug'
})
export class ShareUpdateComponent implements OnInit {

  public update: Updates;

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<ShareUpdateComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {update: Updates},
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.update = data.update;
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/facebook-square-brands.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    this.matIconRegistry.addSvgIcon('email', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/at-solid.svg'));
    this.matIconRegistry.addSvgIcon('copy', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/copy-solid.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/window-close-solid.svg'));
  }

  public openLink(): void {
    this.matBottomSheetRef.dismiss({ plugin: this.update, data: 'share' });
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
  }

  public close(event: MouseEvent): void {
    event.preventDefault();
    this.matBottomSheetRef.dismiss({ plugin: this.update, data: 'close' });
  }

}
