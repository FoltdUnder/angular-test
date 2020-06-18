import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TableRoutingModule} from './table-routing.module';
import {TableComponent} from './table.component';
import {Ng5SliderModule} from "ng5-slider";
import {HideNotInRangePipe} from "../hide-not-in-range.pipe";
import {SortColsPipe} from "../sort-cols.pipe";


@NgModule({
  declarations: [
    TableComponent,
    HideNotInRangePipe,
    SortColsPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableRoutingModule,
    Ng5SliderModule,
  ]
})
export class TableModule {
}
