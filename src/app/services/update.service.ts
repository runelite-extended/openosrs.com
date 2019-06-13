import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {SwUpdate} from '@angular/service-worker';

import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private swUpdate: SwUpdate,
    @Inject(DOCUMENT) private document: Document
  ) {
    if (swUpdate.isEnabled) {
      interval(300000).subscribe(() => swUpdate.checkForUpdate());
    }
  }

  public checkForUpdates(): void {
    this.swUpdate.available.subscribe(() => this.swUpdate.activateUpdate().then(() => document.location.reload()));
  }
}
