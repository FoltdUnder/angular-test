import {Component, OnInit} from '@angular/core';
import {Options} from 'ng5-slider';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  static prevIndex: number = 100;
  private tableSize: number;
  public inputRange;
  public tableHeaders: string[] = [];
  public tableValuesArray: number[][];
  public cellIndex: number;
  public isIncrease: boolean = false;
  public options: Options = {
    floor: 0,
    ceil: 100
  };

  constructor() {
  }

  ngOnInit(): void {
    this.inputRange = {
      from: 0,
      to: 100
    }
  }

  onTableSizeInputChange(event) {
    this.tableSize = event.target.value;
    this.tableValuesArray = this.getTableValuesArray(this.tableSize);
    this.options = {
      floor: 1,
      ceil: this.tableSize ** 2
    }
  }

  onInputRangeChange(range) {
    this.inputRange = {
      from: range.value,
      to: range.highValue
    };
  }

  onClickTable(event) {
    this.cellIndex = event.target.cellIndex;
    if (this.cellIndex == TableComponent.prevIndex) {
      this.isIncrease = !this.isIncrease;
      TableComponent.prevIndex = this.cellIndex;
    } else {
      this.isIncrease = true;
      TableComponent.prevIndex = this.cellIndex;
    }
  }

  getTableValuesArray(size: number): Array<Array<number>> {
    let tableRowsArray: Array<Array<number>> = [];
    for (let i = 0; i <= size; i++) {
      let nestedArray: number[] = [];
      for (let j = 0; j < size; j++) {
        (i == 0) ? this.tableHeaders.push(String.fromCharCode(j + 97))
          : nestedArray[j] = (Math.floor(Math.random() * size ** 2) + 1);
      }
      tableRowsArray[i] = nestedArray;
    }
    return tableRowsArray;
  }

}
