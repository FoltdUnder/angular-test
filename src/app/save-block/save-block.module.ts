import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SaveBlockRoutingModule} from './save-block-routing.module';
import {SaveBlockComponent} from "./save-block.component";


@NgModule({
  declarations: [
    SaveBlockComponent
  ],
  imports: [
    CommonModule,
    SaveBlockRoutingModule
  ]
})
export class SaveBlockModule {
}
