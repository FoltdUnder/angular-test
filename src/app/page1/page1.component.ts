import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {InputExchangeService} from "../input-exchange.service";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {

  constructor(private inputExchangeService: InputExchangeService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.selectRootElement('input').value = this.inputExchangeService.getInputData()
  }
  onPageInputChange(event){
    this.inputExchangeService.setInputData(event.target.value);
  }
}
