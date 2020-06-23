import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServerRoutingModule }      from './server-routing.module';
import { ServerComponent }          from './server.component';
import {ReactiveFormsModule}        from '@angular/forms';

@NgModule({
  declarations: [ServerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServerRoutingModule,

  ]
})
export class ServerModule { }
