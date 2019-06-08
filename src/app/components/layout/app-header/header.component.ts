import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.scss']
})
export class AppHeaderComponent {

  public constructor(
    private domSanitizer: DomSanitizer,
    public matIconRegistry: MatIconRegistry) {
    matIconRegistry.addSvgIcon('twitter', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    matIconRegistry.addSvgIcon('discord', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/discord-brands.svg'));
    matIconRegistry.addSvgIcon('github', domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/github-brands.svg'));
  }
}
