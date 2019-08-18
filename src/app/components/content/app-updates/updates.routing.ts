import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppUpdatesComponent } from './updates.component';
import { AppFullPostComponent } from './app-full-post/full.post.component';

const routes: Routes = [
  {
    path: '',
    component: AppUpdatesComponent,
    pathMatch: 'full'
  },
  {
    path: ':name',
    component: AppFullPostComponent,
    data: {
      title: ''
    }
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

export class UpdatesRoutingModule {
}
