import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'offratingpipe'
})
export class OffRatingPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'ONE_STAR':
        return '1\u2605';
        break;
      case 'TWO_STAR':
        return '2\u2605';
        break;
      case 'THREE_STAR':
        return '3\u2605';
        break;
      case 'FOUR_STAR':
        return '4\u2605';
        break;
      case 'FIVE_STAR':
        return '5\u2605';
        break;
      case 'HV_1':
        return 'HV-1';
        break;
      case 'HV_2':
        return 'HV-2';
        break;
      case 'APARTMENTS':
        return 'Apartments';
        break;
      case 'NO_RATING':
        return '';
        break;
    }
  }
}
