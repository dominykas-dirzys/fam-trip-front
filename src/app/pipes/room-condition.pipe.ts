import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roomconditionpipe'
})
export class RoomConditionPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'NEEDS_RENOVATION':
        return 'Needs renovation';
        break;
      case 'WEAR_AND_TEAR':
        return 'Wear and tear';
        break;
      case 'VERY_GOOD':
        return 'Very good';
        break;
      case 'NEW':
        return 'New';
        break;
    }
  }
}
