import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatBottomSheetModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule, MatSnackBarModule
} from '@angular/material';

import {FeaturesRoutingModule} from './features.routing';

import {AppFeaturesComponent} from './features.component';
import {SharePluginComponent} from './app-share-plugin/share.plugin.component';

import {PluginCategoriesPipe} from '../../../pipes/plugin.categories.pipe';
import {PluginFilterPipe} from '../../../pipes/plugin.filter.pipe';
import {PluginCategoryFilterPipe} from '../../../pipes/plugin.category.filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FlexLayoutModule,

    FeaturesRoutingModule,

    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatListModule,
    MatBottomSheetModule,
    MatIconModule,
  ],
  declarations: [
    AppFeaturesComponent,
    SharePluginComponent,

    PluginCategoriesPipe,
    PluginFilterPipe,
    PluginCategoryFilterPipe
  ],
  entryComponents: [
    SharePluginComponent
  ]
})

export class FeaturesModule {
}
