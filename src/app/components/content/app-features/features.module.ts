import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatIconModule} from '@angular/material/icon';

import { FeaturesRoutingModule } from './features.routing';

import { AppFeaturesComponent } from './features.component';

import { PluginCategoriesPipe } from '../../../pipes/plugin.categories.pipe';
import { PluginFilterPipe } from '../../../pipes/plugin.filter.pipe';
import { PluginCategoryFilterPipe } from '../../../pipes/plugin.category.filter.pipe';

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

    PluginCategoriesPipe,
    PluginFilterPipe,
    PluginCategoryFilterPipe
  ]
})

export class FeaturesModule {
}
