import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material';
import {Plugins} from '../../../../interfaces/plugins.interface';

@Component({
  selector: 'app-share-plugin',
  templateUrl: './share.plugin.component.pug'
})
export class SharePluginComponent {

  public plugin: Plugins;

  constructor(
    private matBottomSheetRef: MatBottomSheetRef<SharePluginComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {plugin: Plugins}) {
    this.plugin = data.plugin;
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
