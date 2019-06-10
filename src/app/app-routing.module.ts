import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {AppHomeComponent} from './components/content/app-home/home.component';

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
    loadChildren: './components/content/app-updates/updates.module#UpdatesModule',
  },
  {
    path: 'features',
    loadChildren: './components/content/app-features/features.module#FeaturesModule',
  },
  {
    path: '**',
    loadChildren: './components/content/app-not-found/not.found.module#NotFoundModule',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
