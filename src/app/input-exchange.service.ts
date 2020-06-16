import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputExchangeService {
  public data: string = '';
  constructor() { }
  setInputData(data: string){
    this.data = data;
  }
  getInputData(){
    return this.data;
  }
}
