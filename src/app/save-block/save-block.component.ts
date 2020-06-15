import {Component, DoCheck, Input, OnChanges, OnInit, Renderer2} from '@angular/core';
import {StylesService} from "../styles.service";

@Component({
  selector: 'app-save-block',
  templateUrl: './save-block.component.html',
  styleUrls: ['./save-block.component.scss']
})
export class SaveBlockComponent implements OnInit, DoCheck {

  constructor( private renderer: Renderer2, private stylesService: StylesService) { }
  public stylesList: string[] = [];
  ngOnInit() {
  }
  ngDoCheck(){
    this.stylesList = this.stylesService.getStylesList();
  }
}

