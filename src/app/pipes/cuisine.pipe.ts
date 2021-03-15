import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cuisinepipe'
})
export class CuisinePipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'VEGETARIAN':
        return 'Vegetarian';
        break;
      case 'ASIAN':
        return 'Asian';
        break;
      case 'CONTINENTAL':
        return 'Continental';
        break;
      case 'MEXICAN':
        return 'Mexican';
        break;
      case 'LOCAL':
        return 'Local';
        break;
      case 'SEAFOOD':
        return 'Seafood';
        break;
      case 'CUSTOM':
        return 'Custom';
        break;
    }
  }
}
