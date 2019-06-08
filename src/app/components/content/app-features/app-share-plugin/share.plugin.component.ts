import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatIconRegistry} from '@angular/material';
import {Plugins} from '../../../../interfaces/plugins.interface';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-share-plugin',
  templateUrl: './share.plugin.component.pug'
})
export class SharePluginComponent {

  public plugin: Plugins;

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<SharePluginComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {plugin: Plugins},
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry) {
    this.plugin = data.plugin;


    matIconRegistry.addSvgIcon('facebook', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/facebook-square-brands.svg'));
    matIconRegistry.addSvgIcon('twitter', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    matIconRegistry.addSvgIcon('email', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/at-solid.svg'));
    matIconRegistry.addSvgIcon('copy', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/copy-solid.svg'));
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

}
