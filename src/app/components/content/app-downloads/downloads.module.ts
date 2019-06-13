import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {DownloadsRoutingModule} from './downloads.routing';

import {AppDownloadsComponent} from './downloads.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,

    DownloadsRoutingModule,
  ],
  declarations: [
    AppDownloadsComponent
  ],
})

export class DownloadsModule {
}
