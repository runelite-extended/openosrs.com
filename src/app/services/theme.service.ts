import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private theme : string;

  @Output() change: EventEmitter<string> = new EventEmitter();

  public getTheme(): string {
    return this.theme;
  }

  public setTheme(theme: string) {
    this.change.emit(theme);
  }
}
