import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {InputExchangeService} from "../input-exchange.service";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {

  constructor(private inputExchangeService: InputExchangeService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.selectRootElement('input').value = this.inputExchangeService.getInputData()
  }
  onPageInputChange(event){
    this.inputExchangeService.setInputData(event.target.value);
  }
}
