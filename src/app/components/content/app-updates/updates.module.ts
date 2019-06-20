import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatChipsModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';

import { UpdatesRoutingModule } from './updates.routing';
import { SharedPipesModule } from '../../../pipes/shared.pipes.module';

import { MarkdownModule } from 'ngx-markdown';

import { AppFullPostComponent } from './app-full-post/full.post.component';
import { AppUpdatesComponent } from './updates.component';
import { AppPostComponent } from './app-post/post.component';
import { ShareUpdateComponent } from './app-share-plugin/share.update.component';

import { CommitMessagePipe } from '../../../pipes/commit.message.pipe';

import { HttpErrorInterceptor } from '../../../interceptor/http-error.interceptor';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,

    UpdatesRoutingModule,

    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatListModule,
    MatBottomSheetModule,
    MatChipsModule,

    SharedPipesModule,

    MarkdownModule.forRoot()
  ],
  declarations: [
    AppFullPostComponent,
    AppUpdatesComponent,
    AppPostComponent,

    ShareUpdateComponent,

    CommitMessagePipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ShareUpdateComponent
  ]
})

export class UpdatesModule {
}
