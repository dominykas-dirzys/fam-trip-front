import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'labelspipe'
})
export class LabelsPipe implements PipeTransform {
  transform(value: any) {
    let labelListString = '';
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
        case 'ECONOMY':
          labelListString = labelListString + 'Economy';
          break;
        case 'SUPERIOR':
          labelListString = labelListString + 'Superior';
          break;
        case 'BOUTIQUE':
          labelListString = labelListString + 'Boutique';
          break;
        case 'ADULTS_ONLY':
          labelListString = labelListString + 'Adults only';
          break;
        case 'ECO_FRIENDLY':
          labelListString = labelListString + 'Eco-friendly (Green)';
          break;
        case 'PARTY':
          labelListString = labelListString + 'Party';
          break;
        case 'SHOPPING':
          labelListString = labelListString + 'Shopping';
          break;
      }
      if (i < value.length - 1) {
        labelListString = labelListString + ' | ';
      }
    }
    return labelListString;
  }
}
