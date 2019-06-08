import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {PluginsJsonService} from '../../../services/plugins.json.service';

import {Plugins} from '../../../interfaces/plugins.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.pug',
  styleUrls: ['./features.component.scss']
})
export class AppFeaturesComponent implements OnInit {

  public plugins$: Observable<Plugins[]>;
  public filter = '';
  public selectedCategory = 'All';
  public categories = [
    'All',
    'PvM',
    'PvP',
    'Skilling',
    'Utility'
  ];

  constructor(private pluginsJsonService: PluginsJsonService) { }

  ngOnInit() {
    this.plugins$ = this.pluginsJsonService.getJSON();
  }
}
