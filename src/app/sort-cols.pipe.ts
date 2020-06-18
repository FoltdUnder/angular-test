import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortCols'
})
export class SortColsPipe implements PipeTransform {
  transform(tableValues: number[][], cellIndex: number, isIncrease: boolean): number[][] {
    if (cellIndex == undefined) return tableValues;
    function decrease(a, b) {
      if (a[cellIndex] < b[cellIndex]) return 1;
      if (a[cellIndex] > b[cellIndex]) return -1;
      return 0;
    }

    function increase(a, b) {
      if (a[cellIndex] < b[cellIndex]) return -1;
      if (a[cellIndex] > b[cellIndex]) return 1;
      return 0;
    }

    if (isIncrease) {
      return tableValues.sort(increase);
    } else {
      return tableValues.sort(decrease);
    }
  }

}
