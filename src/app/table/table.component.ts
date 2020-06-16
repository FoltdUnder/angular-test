import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  private tableSize: number;

  constructor() { }

  ngOnInit(): void {
  }
  onTableInputChange(event){
    this.tableSize = event.target.value;

  }
}
