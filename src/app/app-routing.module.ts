import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page1Component}       from './page1/page1.component';
import {Page2Component}       from './page2/page2.component';
import {TableComponent}       from './table/table.component';
import {FormsComponent}       from './forms/forms.component';
import {ServerComponent}      from './server/server.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'page1',
    component: Page1Component,
  },
  {
    path: 'page2',
    component: Page2Component,
  },
  {
    path: 'table',
    component: TableComponent,
    loadChildren: () => import('./table/table.module').then(m => m.TableModule)
  },
  {
    path: 'forms',
    component: FormsComponent,
    loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule)
  },
  {
    path: 'server',
    component: ServerComponent,
    loadChildren: () => import('./server/server.module').then(m => m.ServerModule)
  },
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
