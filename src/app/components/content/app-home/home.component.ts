import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { SessionService } from '../../../services/session.service';
import { UpdatesJsonService } from '../../../services/updates.service';
import { PluginsJsonService } from '../../../services/plugins.json.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MetaService } from 'src/app/services/meta.service';

import { Updates } from '../../../interfaces/updates.interface';
import { Plugins } from '../../../interfaces/plugins.interface';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent implements OnInit {

  public webp: boolean;
  public session$: Observable<string>;
  public updates$: Observable<Updates[]> | {};
  public plugins$: Observable<Plugins[]>;
  public fatalCountError = false;
  public fatalPostError = false;

  constructor(
    private sessionService: SessionService,
    private pluginsJsonService: PluginsJsonService,
    private updatesJsonService: UpdatesJsonService,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    const description = 'Open-source client for Old School RuneScape with more functionality and less restrictions.';

    this.metaService.updateTags([
      { name: 'keywords', content: 'openosrs, open osrs, runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins' },
      { name: 'description', content: description },
      { name: 'twitter:description', content: description },
      { name: 'og:url', content: 'https://openosrs.com/home', property: true },
      { name: 'og:type', content: 'website', property: true },
      { name: 'og:description', content: description, property: true },
    ]);

    this.updates$ = this.updatesJsonService.getJSON().pipe(
      catchError(() => {
        this.fatalPostError = true;
        this.notificationService.showError('The latest update posts could not be fetched.');

        this.changeDetectorRef.detectChanges();

        return of({}); // return empty array
      })
    );
    this.plugins$ = this.pluginsJsonService.getJSON();

    this.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

    this.session$ = this.sessionService.getSessionCount().pipe(
      catchError(() => {
        this.fatalCountError = true;
        return of(''); // return empty string
      })
    );
  }
}
