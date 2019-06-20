import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatStepperModule, MatFormFieldModule, MatSelectModule, MatCardModule } from '@angular/material';

import { DownloadsRoutingModule } from './downloads.routing';

import { AppDownloadsComponent } from './downloads.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,

    DownloadsRoutingModule,
  ],
  declarations: [
    AppDownloadsComponent
  ],
})

export class DownloadsModule {
}
