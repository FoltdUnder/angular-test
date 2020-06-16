import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SaveBlockComponent} from "./save-block.component";


const routes: Routes = [
  {
    path: '',
    component: SaveBlockComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaveBlockRoutingModule {
}
