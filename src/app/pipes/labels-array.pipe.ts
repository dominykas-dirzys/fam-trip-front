import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'labelsarraypipe'
})
export class LabelsArrayPipe implements PipeTransform {
  transform(value: any) {
    let labelListString = '';
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
        case 'ECONOMY':
          labelListString = labelListString + 'Eco';
          break;
        case 'SUPERIOR':
          labelListString = labelListString + 'Super';
          break;
        case 'BOUTIQUE':
          labelListString = labelListString + 'Boutique';
          break;
        case 'ADULTS_ONLY':
          labelListString = labelListString + 'Adult';
          break;
        case 'ECO_FRIENDLY':
          labelListString = labelListString + 'Green';
          break;
        case 'PARTY':
          labelListString = labelListString + 'Party';
          break;
        case 'SHOPPING':
          labelListString = labelListString + 'Shops';
          break;
      }
      if (i < value.length - 1) {
        labelListString = labelListString + ' | ';
      }
    }
    return labelListString;
  }
}
