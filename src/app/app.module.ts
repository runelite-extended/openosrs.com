import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { SharedPipesModule } from './pipes/shared.pipes.module';

import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

import { AppComponent } from './components/layout/app-root/app.component';
import { AppHeaderComponent } from './components/layout/app-header/header.component';
import { AppFooterComponent } from './components/layout/app-footer/footer.component';
import { AppHomeComponent } from './components/content/app-home/home.component';

import { ShufflePluginsPipe } from './pipes/plugin.shuffle.pipe';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const dbConfig: DBConfig  = {
  name: 'openosrs',
  version: 1,
  objectStoresMeta: [
    {
      store: 'github_commits',
      storeConfig: {
        keyPath: 'id',
        autoIncrement: false
      },
      storeSchema: [
        // Update
        { name: 'update', keypath: 'update', options: { unique: false } },

        // Commit
        { name: 'message', keypath: 'message', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'html_url', keypath: 'html_url', options: { unique: false } },

        // Author
        { name: 'author_name', keypath: 'author_name', options: { unique: false } },
        { name: 'author_login', keypath: 'author_login', options: { unique: false } },
        { name: 'author_html_url', keypath: 'author_html_url', options: { unique: false } },

        // Commiter
        { name: 'commiter_name', keypath: 'commiter_name', options: { unique: false } },
        { name: 'commiter_login', keypath: 'commiter_login', options: { unique: false } },
        { name: 'commiter_html_url', keypath: 'commiter_html_url', options: { unique: false } },
      ]
    }
  ]
};

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,

    AppHomeComponent,
    ShufflePluginsPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    FlexLayoutModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,

    SharedPipesModule,

    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
