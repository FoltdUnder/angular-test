import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home.component";
import {VideoComponent} from "../video/video.component";


const routes: Routes = [
  {
    path: 'block',
    component: HomeComponent,
    loadChildren: () => import('../block/block.module').then(m => m.BlockModule),
  },
  {
    path: 'video',
    component: VideoComponent,
    loadChildren: () => import('../video/video.module').then(m => m.VideoModule),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
