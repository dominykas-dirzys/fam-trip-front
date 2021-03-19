import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rectopipe'
})
export class RecToPipe implements PipeTransform {
  transform(value: any) {
    let labelListString = '';
    for (let i = 0; i < value.length; i++) {
      switch (value[i]) {
        case 'FAMILIES_WITH_YOUNG_CHILDREN':
          labelListString = labelListString + 'Families with young children';
          break;
        case 'FAMILIES_WITH_OLDER_CHILDREN':
          labelListString = labelListString + 'Families with older children';
          break;
        case 'COUPLES':
          labelListString = labelListString + 'Couples';
          break;
        case 'FRIENDS':
          labelListString = labelListString + 'Friends';
          break;
        case 'YOUTH':
          labelListString = labelListString + 'Youth';
          break;
        case 'BUSINESS':
          labelListString = labelListString + 'Business';
          break;
        case 'SOLO_TRAVELERS':
          labelListString = labelListString + 'Solo travelers';
          break;
      }
      if (i < value.length - 1) {
        labelListString = labelListString + ' | ';
      }
    }
    return labelListString;
  }
}
