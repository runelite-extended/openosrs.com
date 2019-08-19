import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppIntegrationComponent } from './integration.component';

const routes: Routes = [
  {
    path: '',
    component: AppIntegrationComponent
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

export class IntegrationRoutingModule {
}
