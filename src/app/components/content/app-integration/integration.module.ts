import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatStepperModule, MatSelectModule, MatCardModule } from '@angular/material';

import { IntegrationRoutingModule } from './integration.routing';

import { SharedPipesModule } from 'src/app/pipes/shared.pipes.module';

import { AppIntegrationComponent } from './integration.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,

    IntegrationRoutingModule,

    SharedPipesModule
  ],
  declarations: [
    AppIntegrationComponent
  ],
})

export class IntegrationModule {
}
