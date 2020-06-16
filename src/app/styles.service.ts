import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesService {
  public styleList: string[];
  constructor() { }
  setStylesList(styleList: string[]) {
    this.styleList =  styleList;
  }
  getStylesList() {
    return this.styleList;
  }
}
