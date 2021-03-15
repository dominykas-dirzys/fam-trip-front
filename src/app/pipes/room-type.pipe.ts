import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roomtypepipe'
})
export class RoomTypePipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'PROMO':
        return 'Promo';
        break;
      case 'STANDARD_DBL':
        return 'Standard Double';
        break;
      case 'FAMILY':
        return 'Family';
        break;
      case 'SUITE':
        return 'Suite';
        break;
      case 'DBL_SEA_VIEW':
        return 'Double Sea View';
        break;
      case 'CUSTOM':
        return 'Custom';
        break;
    }
  }
}
