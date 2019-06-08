import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.pug',
  styleUrls: ['./footer.component.styl']
})
export class AppFooterComponent implements OnInit {

  public currentYear: number;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
