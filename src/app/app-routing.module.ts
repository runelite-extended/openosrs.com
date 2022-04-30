import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './components/content/app-home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AppHomeComponent,
    data: {
      title: 'Open-Source OSRS Client'
    }
  },
  {
    path: 'downloads',
    loadChildren: () => import('./components/content/app-downloads/downloads.module').then(m => m.DownloadsModule),
    data: {
      title: 'Client Downloads'
    }
  },
  {
    path: 'features',
    loadChildren: () => import('./components/content/app-features/features.module').then(m => m.FeaturesModule),
    data: {
      title: 'List Of Features'
    }
  },
  {
    path: 'integration',
    loadChildren: () => import('./components/content/app-integration/integration.module').then(m => m.IntegrationModule),
    data: {
      title: 'integration'
    }
  },
  {
    path: '**',
    loadChildren: () => import('./components/content/app-not-found/not.found.module').then(m => m.NotFoundModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
