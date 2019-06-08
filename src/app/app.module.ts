import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/layout/app-root/app.component';
import {AppHeaderComponent} from './components/layout/app-header/header.component';
import {AppFooterComponent} from './components/layout/app-footer/footer.component';
import {AppHomeComponent} from './components/content/app-home/home.component';
import {AppUpdatesComponent} from './components/content/app-updates/updates.component';
import {AppFeaturesComponent} from './components/content/app-features/features.component';

import {HttpErrorInterceptor} from './interceptor/http-error.interceptor';

import {CommitMessagePipe} from './pipes/commit.message.pipe';
import {PluginCategoriesPipe} from './pipes/plugin.categories.pipe';
import {PluginFilterPipe} from './pipes/plugin.filter.pipe';
import {PluginCategoryFilterPipe} from './pipes/plugin.category.filter.pipe';

import {PluginsJsonService} from './services/plugins.json.service';
import {GithubService} from './services/github.service';
import {NotificationService} from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,

    AppHomeComponent,
    AppUpdatesComponent,
    AppFeaturesComponent,

    CommitMessagePipe,
    PluginCategoriesPipe,
    PluginFilterPipe,
    PluginCategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  providers: [
    PluginsJsonService,
    GithubService,
    NotificationService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
