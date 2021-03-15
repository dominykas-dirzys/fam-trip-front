import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'checkmarkpipe'
})
export class CheckmarkPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case true:
        return '\u2713';
        break;
      case false:
        return '\u2717';
        break;
    }
  }
}
