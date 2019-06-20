import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Updates } from '../../../../interfaces/updates.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppPostComponent {
  @Input() update: Updates;
}
