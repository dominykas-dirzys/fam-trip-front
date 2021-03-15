import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'labelspipe'
})
export class LabelsPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'ECONOMY':
        return 'Economy';
        break;
      case 'SUPERIOR':
        return 'Superior';
        break;
      case 'BOUTIQUE':
        return 'Boutique';
        break;
      case 'ADULTS_ONLY':
        return 'Adults only';
        break;
      case 'ECO_FRIENDLY':
        return 'Eco-friendly';
        break;
      case 'PARTY':
        return 'Party';
        break;
      case 'SHOPPING':
        return 'Shopping';
        break;
    }
  }
}
