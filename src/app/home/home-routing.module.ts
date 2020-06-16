import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'block',
        loadChildren: () => import('../block/block.module').then(m => m.BlockModule),
      },
      {
        path: 'video',
        loadChildren: () => import('../video/video.module').then(m => m.VideoModule),
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
