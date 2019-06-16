import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'commitDate'})
export class CommitDatePipe implements PipeTransform {
  transform(commitDate: string): string {
    try {
      const date = new Date(commitDate);
      if (!CommitDatePipe.isValidDate(date)) {
        throw new Error("Date parsing failed");
      }
      return date.toLocaleDateString();
    } catch (e) {
      return commitDate;
    }
  }

  private static isValidDate(d: Date) {
    return d.getTime() === d.getTime();
  }
}
