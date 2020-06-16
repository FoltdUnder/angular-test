import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InputExchangeService {
  private data = new BehaviorSubject('');
  public inputText = this.data.asObservable();
  constructor() {
  }

  updateInputData(data: string) {
    this.data.next(data);
  }
}
