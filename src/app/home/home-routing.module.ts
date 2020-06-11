import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () => import('../block/block.module').then(m => m.BlockModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
