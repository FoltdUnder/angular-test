import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputExchangeService} from "../input-exchange.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit, OnDestroy {
  public inputText: string;
  private subs: Subscription;

  constructor(private inputExchangeService: InputExchangeService) {
  }

  ngOnInit(): void {
    this.subs = this.inputExchangeService.inputText.subscribe(data => this.inputText = data);
  }

  onPageInputChange(event) {
    this.inputExchangeService.updateInputData(event.target.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
