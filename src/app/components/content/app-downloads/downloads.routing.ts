import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppDownloadsComponent} from './downloads.component';


const routes: Routes = [
  {
    path: '',
    component: AppDownloadsComponent
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

export class DownloadsRoutingModule {
}
