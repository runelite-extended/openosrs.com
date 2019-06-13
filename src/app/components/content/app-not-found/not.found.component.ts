import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';

import {NotificationService} from '../../../services/notification.service';

@Component({
  selector: 'app-not-found',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNotFoundComponent {

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {

    this.notificationService.showError("The page you were looking for does not exist!");
    this.router.navigate(['/'])
  }
}
