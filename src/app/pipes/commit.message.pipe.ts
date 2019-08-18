import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'commitMessage' })
export class CommitMessagePipe implements PipeTransform {
  transform(commitMessage: string): string {
    if (!commitMessage.match(/\r?\n/)) {
      return commitMessage;
    }

    return commitMessage.split(/\r?\n/)[0];
  }
}
