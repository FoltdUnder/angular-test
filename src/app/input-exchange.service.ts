import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputExchangeService {
  private data = new BehaviorSubject('');
  public inputText = this.data.asObservable();

  updateInputData(data: string) {
    this.data.next(data);
  }
}
