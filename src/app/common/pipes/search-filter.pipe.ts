import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: true
})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) return items;

    const lowerSearchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      return Object.values(item).some(value => {
        if (value == null) return false;
        return value.toString().toLowerCase().includes(lowerSearchTerm);
      });
    });
  }
}
