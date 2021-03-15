import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rectopipe'
})
export class RecToPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'FAMILIES_WITH_YOUNG_CHILDREN':
        return 'Families with young children';
        break;
      case 'FAMILIES_WITH_OLDER_CHILDREN':
        return 'Families with older children';
        break;
      case 'COUPLES':
        return 'Couples';
        break;
      case 'FRIENDS':
        return 'Friends';
        break;
      case 'YOUTH':
        return 'Youth';
        break;
      case 'BUSINESS':
        return 'Business';
        break;
      case 'SOLO_TRAVELERS':
        return 'Solo travelers';
        break;
    }
  }
}
