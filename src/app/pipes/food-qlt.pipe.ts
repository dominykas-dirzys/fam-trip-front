import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'foodqltpipe'
})
export class FoodQltPipe implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 'TERRIBLE':
        return 'Terrible';
        break;
      case 'POOR':
        return 'Poor';
        break;
      case 'AVERAGE':
        return 'Average';
        break;
      case 'GOOD':
        return 'Good';
        break;
      case 'FANTASTIC':
        return 'Fantastic';
        break;
    }
  }
}
