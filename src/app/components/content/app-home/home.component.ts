import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

import {SessionService} from '../../../services/session.service';
import {UpdatesJsonService} from '../../../services/updates.service';
import {PluginsJsonService} from '../../../services/plugins.json.service';

import {Updates} from '../../../interfaces/updates.interface';
import {Plugins} from '../../../interfaces/plugins.interface';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHomeComponent implements OnInit {

  public webp: boolean;
  public session$: Observable<string>;
  public fatalError = false;
  public updates$: Observable<Updates[]>;
  public plugins$: Observable<Plugins[]>;

  constructor(
    private sessionService: SessionService,
    private pluginsJsonService: PluginsJsonService,
    private updatesJsonService: UpdatesJsonService,
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Runelite Plus: Homepage');
    this.metaTagService.updateTag({ name: 'description', content: 'RuneLitePlus provides more functionality and less restrictions while staying open source. We have lots of RuneLite Plus plugins!' });
    this.metaTagService.updateTag({ name: 'keywords', content: 'runelite, runeliteplus, runelite plus, runelite pvp plugins, runelite pvp, runelite plugins' });

    this.updates$ = this.updatesJsonService.getJSON();
    this.plugins$ = this.pluginsJsonService.getJSON();

    this.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    this.session$ = this.sessionService.getSessionCount().pipe(
      catchError(() => {
        this.fatalError = true;
        console.log("session fatal error");
        return of(''); // return empty string
      })
    );
  }
}
