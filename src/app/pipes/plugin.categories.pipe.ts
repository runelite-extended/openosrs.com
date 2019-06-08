import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'pluginCategories'})
export class PluginCategoriesPipe implements PipeTransform {
  transform(values: string[]): string {
    if (!values || typeof values === 'undefined') {
      return '';
    }

    return `${values.length === 1 ? 'Category' : 'Categories'}: ${values.join(', ')}`;
  }
}
