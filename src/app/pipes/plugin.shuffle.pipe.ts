import { Pipe, PipeTransform } from '@angular/core';

import { Plugins } from '../interfaces/plugins.interface';

@Pipe({ name: 'shufflePlugins' })
export class ShufflePluginsPipe implements PipeTransform {
  transform(input: Plugins[]): Plugins[] {

    if (!Array.isArray(input)) {
      return input;
    }

    const shuffled = [...input];

    for (let i = shuffled.length; i; --i) {
      const j = Math.floor(Math.random() * i);
      const x = shuffled[i - 1];
      shuffled[i - 1] = shuffled[j];
      shuffled[j] = x;
    }

    return shuffled;
  }
}
