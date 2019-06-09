import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MarkdownModule} from 'ngx-markdown';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './components/layout/app-root/app.component';
import {AppHeaderComponent} from './components/layout/app-header/header.component';
import {AppFooterComponent} from './components/layout/app-footer/footer.component';
import {AppHomeComponent} from './components/content/app-home/home.component';
import {AppUpdatesComponent} from './components/content/app-updates/updates.component';
import {AppFullPostComponent} from './components/content/app-updates/app-full-post/full.post.component';
import {AppPostComponent} from './components/content/app-updates/app-post/post.component';
import {AppFeaturesComponent} from './components/content/app-features/features.component';
import {SharePluginComponent} from './components/content/app-features/app-share-plugin/share.plugin.component';
import {ShareUpdateComponent} from './components/content/app-updates/app-share-plugin/share.update.component';

import {HttpErrorInterceptor} from './interceptor/http-error.interceptor';

import {CommitMessagePipe} from './pipes/commit.message.pipe';
import {CommitDatePipe} from './pipes/commit.date.pipe';
import {PluginCategoriesPipe} from './pipes/plugin.categories.pipe';
import {PluginFilterPipe} from './pipes/plugin.filter.pipe';
import {PluginCategoryFilterPipe} from './pipes/plugin.category.filter.pipe';
import {ShufflePluginsPipe} from './pipes/plugin.shuffle.pipe';

import {PluginsJsonService} from './services/plugins.json.service';
import {UpdatesJsonService} from './services/updates.service';
import {GithubService} from './services/github.service';
import {SessionService} from './services/session.service';
import {NotificationService} from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,

    AppHomeComponent,
    AppUpdatesComponent,
    AppFeaturesComponent,
    AppFullPostComponent,
    AppPostComponent,

    SharePluginComponent,
    ShareUpdateComponent,

    CommitMessagePipe,
    CommitDatePipe,
    PluginCategoriesPipe,
    PluginFilterPipe,
    PluginCategoryFilterPipe,
    ShufflePluginsPipe
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
    MatSnackBarModule,
    MatListModule,
    MatBottomSheetModule,
    MatChipsModule,

    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [
    PluginsJsonService,
    UpdatesJsonService,
    GithubService,
    SessionService,
    NotificationService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    SharePluginComponent,
    ShareUpdateComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
