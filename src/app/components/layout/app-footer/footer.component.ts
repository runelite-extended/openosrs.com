import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  public currentYear: number;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }
}
