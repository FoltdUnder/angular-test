import {Component, Input, OnChanges, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-save-block',
  templateUrl: './save-block.component.html',
  styleUrls: ['./save-block.component.scss']
})
export class SaveBlockComponent implements OnInit, OnChanges {

  constructor( private renderer: Renderer2) { }
  private stylesList: string[] = [];
  ngOnInit(): void {
    const block = this.renderer.selectRootElement('.block');
    const blockStyles = getComputedStyle(block);
    this.stylesList.push('width: ' + blockStyles.width);
    this.stylesList.push('height: ' + blockStyles.height);
    this.stylesList.push('left: ' + blockStyles.left);
    this.stylesList.push('top: ' + blockStyles.top);
  }
  ngOnChanges(){

  }

}

