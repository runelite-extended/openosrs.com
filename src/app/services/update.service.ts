import {Injectable, OnInit} from '@angular/core';

import {MatSnackBar} from '@angular/material';
import {SwUpdate} from '@angular/service-worker';

import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar
  ) {
    if (swUpdate.isEnabled) {
      interval(300000).subscribe(() => swUpdate.checkForUpdate());
    }
  }

  public checkForUpdates(): void {
    this.swUpdate.available.subscribe(() => this.promptUser());
  }

  private promptUser(): void {
    this.snackbar.open(
      'Website update available',
      'Reload'
    )
      .onAction()
      .subscribe(() => {
        window.location.reload();
      });
  }
}
