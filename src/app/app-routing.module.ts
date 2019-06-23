import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppHomeComponent } from './components/content/app-home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppHomeComponent,
    data: {
      title: 'homepage'
    }
  },
  {
    path: 'downloads',
    loadChildren: () => import('./components/content/app-downloads/downloads.module').then(m => m.DownloadsModule),
    data: {
      title: 'downloads'
    }
  },
  {
    path: 'updates',
    loadChildren: () => import('./components/content/app-updates/updates.module').then(m => m.UpdatesModule),
    data: {
      title: 'updates'
    }
  },
  {
    path: 'features',
    loadChildren: () => import('./components/content/app-features/features.module').then(m => m.FeaturesModule),
    data: {
      title: 'features'
    }
  },
  {
    path: '**',
    loadChildren: () => import('./components/content/app-not-found/not.found.module').then(m => m.NotFoundModule),
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
