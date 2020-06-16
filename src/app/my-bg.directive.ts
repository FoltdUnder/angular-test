import {Directive, DoCheck, Input, ElementRef} from '@angular/core';

@Directive({
  selector: '[myBg]'
})
export class MyBgDirective{

  constructor(private el: ElementRef) {
  }
  @Input() set myBg(youTubeVideoId: string){
    this.el.nativeElement.style.background = `url(https://img.youtube.com/vi/${youTubeVideoId}/maxresdefault.jpg) center center`
    this.el.nativeElement.style.backgroundSize = 'cover';
  };
}
