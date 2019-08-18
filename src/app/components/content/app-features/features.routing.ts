import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppFeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '',
    component: AppFeaturesComponent
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

export class FeaturesRoutingModule {
}
