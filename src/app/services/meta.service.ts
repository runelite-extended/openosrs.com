import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetaService {
  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  updateTags(tags: Array<{ name: string, content: string, property?: boolean }>) {
    this.removeArticleTags();

    for (const tag of tags) {
      let tagObj: { name?: string, property?: string, content: string };

      console.log(`Updating ${tag.name}: property? ${tag.property}`);

      if (typeof tag.property !== 'undefined' && tag.property) {
        tagObj = { property: tag.name, content: tag.content };
      } else {
        tagObj = { name: tag.name, content: tag.content };
      }

      this.meta.updateTag(tagObj);
    }
  }

  removeArticleTags() {
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    this.meta.removeTag('property=\'article:published_time\'');
    this.meta.removeTag('property=\'article:modified_time\'');
    this.meta.removeTag('property=\'article:author\'');
    this.meta.removeTag('property=\'article:section\'');
    this.meta.removeTag('property=\'article:tag\'');
  }

  addArticleTags(date: string, tag: string) {
    this.meta.updateTag({ property: 'og:type', content: 'article' });

    this.meta.addTags([
      { property: 'article:published_time', content: date },
      { property: 'article:modified_time', content: date },
      { property: 'article:author', content: 'RuneLite Plus' },
      { property: 'article:section', content: 'RuneLite Plus software update' },
      { property: 'article:tag', content: tag }
    ]);
  }

  updateTitle(title?: string) {
    if (!title) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) {
              route = route.firstChild;
            }

            return route;
          }),
          filter((route) => route.outlet === PRIMARY_OUTLET),
          mergeMap((route) => route.data)).subscribe((event) => {
            if (event.title !== '') {
              const pageTitle = 'Runelite Plus - ' + event.title;
              this.titleService.setTitle(pageTitle);

              this.updateTags([
                { name: 'twitter:title', content: pageTitle },
                { name: 'og:title', content: pageTitle, property: true }
              ]);
            }
          });
    } else {
      const pageTitle = 'Runelite Plus - ' + title;
      this.titleService.setTitle(pageTitle);

      this.updateTags([
        { name: 'twitter:title', content: pageTitle },
        { name: 'og:title', content: pageTitle, property: true }
      ]);
    }
  }
}
