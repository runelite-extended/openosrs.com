import {Pipe, PipeTransform} from '@angular/core';

import {Plugins} from '../interfaces/plugins.interface';

@Pipe({name: 'pluginFilter'})
export class PluginFilterPipe implements PipeTransform {
  transform(plugins: Plugins[], filter: string): Plugins[] {
    if (!plugins || !filter) {
      return plugins;
    }

    return plugins.filter(
      plugin =>  plugin.name.toLowerCase().includes(filter.toLowerCase()) ||
        plugin.description.toLowerCase().includes(filter.toLowerCase())
    );
  }
}
