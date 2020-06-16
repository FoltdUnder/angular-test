import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlockComponent} from "./block.component";


const routes: Routes = [
  {
    path: '',
    component: BlockComponent,
    children: [
      {
        path: 'save',
        loadChildren: () => import('../save-block/save-block.module').then(m => m.SaveBlockModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlockRoutingModule {
}
