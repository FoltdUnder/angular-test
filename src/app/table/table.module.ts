import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table.component';


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    RouterModule,
    TableRoutingModule
  ]
})
export class TableModule { }
