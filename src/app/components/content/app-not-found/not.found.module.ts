import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {NotFoundRoutingModule} from './not.found.routing';

import {AppNotFoundComponent} from './not.found.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,

    NotFoundRoutingModule,
  ],
  declarations: [
    AppNotFoundComponent
  ],
})

export class NotFoundModule {
}
