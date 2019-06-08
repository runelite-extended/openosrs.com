import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'commitDate'})
export class CommitDatePipe implements PipeTransform {
  transform(commitDate: string): string {
    try {
      const date = new Date(commitDate);
      return date.toLocaleDateString();
    } catch (e) {
      return commitDate;
    }
  }
}
