import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'hideNotInRange'
})
export class HideNotInRangePipe implements PipeTransform {

  transform(value: number, from: number, to: number) {
    if (!isNaN(+value) && value < from || value > to) {
      return ' ';
    }
    return value;
  }

}
