import {ChangeDetectionStrategy, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

import {LocalStorageService} from '../../../services/localstorage.service';
import {ThemeService} from '../../../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent implements OnInit {

  public switcher: boolean;
  public theme: string;

  public constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService
  ) {
    const style = getComputedStyle(document.documentElement).getPropertyValue('content');

    if (style !== "dark" && style !== "light") {
      this.switcher = localStorageService.checkSupport();
    } else if (style === "dark") {
      getComputedStyle(document.documentElement).setProperty('content', 'dark');
    } else if (style === "light") {
    }

    if (this.switcher) {
      this.localStorageService.getPromise('theme').then((theme) => {
        if (theme === 'dark') {
          this.theme = "dark";
        } else {
          this.theme = "light";
        }

        this.themeService.setTheme(this.theme);
      });
    }
  }

  ngOnInit(): void {
    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/twitter-brands.svg'));
    this.matIconRegistry.addSvgIcon('discord', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/discord-brands.svg'));
    this.matIconRegistry.addSvgIcon('github', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/github-brands.svg'));
    this.matIconRegistry.addSvgIcon('patreon', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/heart-solid.svg'));
    this.matIconRegistry.addSvgIcon('moon', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/moon-solid.svg'));
    this.matIconRegistry.addSvgIcon('sun', this.domSanitizer.bypassSecurityTrustResourceUrl('/assets/fa/sun-solid.svg'));
  }

  public switchTheme() {
    this.localStorageService.setPromise('theme', this.theme === 'dark' ? "light" : "dark").then((theme) => {
      if (theme === 'dark') {
        this.theme = "dark";
      } else {
        this.theme = "light";
      }

      this.themeService.setTheme(this.theme);
    });
  }
}
