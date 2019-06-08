import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.pug',
  styleUrls: ['./home.component.scss']
})
export class AppHomeComponent implements OnInit {

  public webp: boolean;

  ngOnInit(): void {
    this.webp = document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
}
