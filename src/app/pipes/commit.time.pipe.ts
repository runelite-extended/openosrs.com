import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'commitTime'})
export class CommitTitlePipe implements PipeTransform {
  transform(commitTime: string): string {
    try {
      return new Date(commitTime).toLocaleString();
    } catch (e) {
      return commitTime;
    }
  }
}
