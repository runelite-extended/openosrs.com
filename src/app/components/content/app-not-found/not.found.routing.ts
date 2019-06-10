import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppNotFoundComponent} from './not.found.component';


const routes: Routes = [
  {
    path: '',
    component: AppNotFoundComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class NotFoundRoutingModule {
}
