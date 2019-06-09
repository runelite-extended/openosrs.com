import {Component, OnInit} from '@angular/core';

import {SessionService} from '../../../services/session.service';
import {UpdatesJsonService} from '../../../services/updates.service';

import {Updates} from '../../../interfaces/updates.interface';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Plugins} from '../../../interfaces/plugins.interface';
import {PluginsJsonService} from '../../../services/plugins.json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.scss']
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
  ) { }

  ngOnInit(): void {
    this.updates$ = this.updatesJsonService.getJSON();
    this.plugins$ = this.pluginsJsonService.getJSON();

    this.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    this.session$ = this.sessionService.getSessionCount().pipe(
      catchError(() => {
        this.fatalError = true;
        return of(''); // return empty string
      })
    );
  }
}
