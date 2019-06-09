import {Component, OnInit} from '@angular/core';
import {SessionService} from '../../../services/session.service';

import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.scss']
})
export class AppHomeComponent implements OnInit {

  public webp: boolean;
  public session$: Observable<string>;
  public fatalError = false;

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    this.session$ = this.sessionService.getSessionCount().pipe(
      catchError(() => {
        this.fatalError = true;
        return of(''); // return empty string
      })
    );
  }
}
