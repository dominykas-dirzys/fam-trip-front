import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cuisinepipe'
})
export class CuisinePipe implements PipeTransform {
  transform(value: any) {
    let labelListString = '';
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
        case 'VEGETARIAN':
          labelListString = labelListString + 'Vegetarian';
          break;
        case 'ASIAN':
          labelListString = labelListString + 'Asian';
          break;
        case 'CONTINENTAL':
          labelListString = labelListString + 'Continental';
          break;
        case 'MEXICAN':
          labelListString = labelListString + 'Mexican';
          break;
        case 'LOCAL':
          labelListString = labelListString + 'Local';
          break;
        case 'SEAFOOD':
          labelListString = labelListString + 'Seafood';
          break;
        case 'CUSTOM':
          labelListString = labelListString + 'Custom';
          break;
      }
      if (i < value.length - 1) {
        labelListString = labelListString + ' | ';
      }
    }
    return labelListString;
  }
}
