import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {SharedPipesModule} from './pipes/shared.pipes.module';

import {AppComponent} from './components/layout/app-root/app.component';
import {AppHeaderComponent} from './components/layout/app-header/header.component';
import {AppFooterComponent} from './components/layout/app-footer/footer.component';
import {AppHomeComponent} from './components/content/app-home/home.component';

import {ShufflePluginsPipe} from './pipes/plugin.shuffle.pipe';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
