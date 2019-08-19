import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-integration',
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppIntegrationComponent implements OnInit {

  public code: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(queryParams => {
      this.code = queryParams.get('code');
    });
  }
}
