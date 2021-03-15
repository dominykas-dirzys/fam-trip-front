import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sizepipe'
})
export class SizePipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'SMALL':
        return 'Small';
        break;
      case 'NORMAL':
        return 'Normal';
        break;
      case 'LARGE':
        return 'Large';
        break;
    }
  }
}
