import {Pipe, PipeTransform} from '@angular/core';

import {Plugins} from '../interfaces/plugins.interface';

@Pipe({name: 'pluginCategoryFilter'})
export class PluginCategoryFilterPipe implements PipeTransform {
  transform(plugins: Plugins[], filter: string): Plugins[] {
    if (!plugins || !filter || filter === 'All') {
      return plugins;
    }

    return plugins.filter(plugin => plugin.categories.includes(filter));
  }
}
