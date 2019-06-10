import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatIconRegistry} from '@angular/material';

import {Plugins} from '../../../../interfaces/plugins.interface';

@Component({
  selector: 'app-share-plugin',
  templateUrl: './share.plugin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharePluginComponent implements OnInit {

  public plugin: Plugins;

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<SharePluginComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {plugin: Plugins},
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry
  ) {
    this.plugin = data.plugin;
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('facebook', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/facebook-square-brands.svg'));
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    this.matIconRegistry.addSvgIcon('email', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/at-solid.svg'));
    this.matIconRegistry.addSvgIcon('copy', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/copy-solid.svg'));
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/window-close-solid.svg'));
  }

  public replaceAll(str: string, find: string, replace: string) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  public openLink(): void {
    this.matBottomSheetRef.dismiss({ plugin: this.plugin, data: 'share' });
  }

  public copyLink(event: MouseEvent): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `https://runelitepl.us/features/${this.replaceAll(this.plugin.name, ' ', '%20').toLowerCase()}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    event.preventDefault();
    this.matBottomSheetRef.dismiss({ plugin: this.plugin, data: 'copy' });
  }

  public close(event: MouseEvent): void {
    event.preventDefault();
    this.matBottomSheetRef.dismiss({ plugin: this.plugin, data: 'close' });
  }

}
