import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { DownloadsRoutingModule } from './downloads.routing';

import { SharedPipesModule } from 'src/app/pipes/shared.pipes.module';

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

    SharedPipesModule
  ],
  declarations: [
    AppDownloadsComponent
  ],
})

export class DownloadsModule {
}
