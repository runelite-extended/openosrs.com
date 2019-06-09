import {Component, Input, OnInit} from '@angular/core';
import {Updates} from '../../../../interfaces/updates.interface';
import {ActivatedRoute} from '@angular/router';
import {UpdatesJsonService} from '../../../../services/updates.service';

@Component({
  selector: 'app-full-post',
  templateUrl: './full.post.component.pug',
  styleUrls: ['./full.post.component.scss'],
})
export class AppFullPostComponent {

  public update: Updates = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private updatesJsonService: UpdatesJsonService,
  ) {
    this.activatedRoute.params.subscribe( params => {
      this.updatesJsonService.getJSON().subscribe((data: Updates[]) => {
        for (const update of data) {
          if (update.mdFile === params.name) {
            this.update = update;
          }
        }
      });
    });
  }
}
