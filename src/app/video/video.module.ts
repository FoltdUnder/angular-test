import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VideoRoutingModule} from './video-routing.module';
import {VideoComponent} from './video.component';
import {MyIfDirective} from "../my-if.directive";
import {MyBgDirective} from "../my-bg.directive";

@NgModule({
  declarations: [
    VideoComponent,
    MyIfDirective,
    MyBgDirective,
  ],
  imports: [
    CommonModule,
    VideoRoutingModule,
  ]
})
export class VideoModule {
}
