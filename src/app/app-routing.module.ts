import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppHomeComponent} from './components/content/app-home/home.component';
import {AppFeaturesComponent} from './components/content/app-features/features.component';
import {AppUpdatesComponent} from './components/content/app-updates/updates.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppHomeComponent
  },
  {
    path: 'updates',
    component: AppUpdatesComponent
  },
  {
    path: 'features',
    component: AppFeaturesComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
