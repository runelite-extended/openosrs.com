import {Component, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {PluginsJsonService} from '../../../services/plugins.json.service';

import {Plugins} from '../../../interfaces/plugins.interface';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.pug',
  styleUrls: ['./features.component.styl']
})
export class AppFeaturesComponent implements OnInit {

  private plugins$: Observable<Plugins[]>;
  private filter = '';
  private selectedCategory = 'All';
  private categories = [
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
