import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  showError(message: string): void {
    this.snackBar.open(message, 'X', { panelClass: ['error'], duration: 2500 });
  }
}
