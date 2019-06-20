import { NgModule } from '@angular/core';

import { CommitDatePipe } from './commit.date.pipe';

@NgModule({
  declarations: [
    CommitDatePipe
  ],
  exports: [
    CommitDatePipe
  ]
})
export class SharedPipesModule { }
