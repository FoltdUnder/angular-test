import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(value: object[], length: number): object[] {
    return value.slice(0, length);
  }

}
