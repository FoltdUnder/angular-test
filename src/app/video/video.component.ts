import {Component, OnInit, Renderer2} from '@angular/core';
import {MyIfDirective} from "../my-if.directive";

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  public youTubeVideoId: string = 'nGowXe9bINU';
  public showVideoBg: boolean = false;
  constructor( private renderer: Renderer2) { }
  ngOnInit(): void {
  }

  /**
   * Получает ID видео из введённых данных, меняет значение showVideoBg для отображения кнопки.
   * @param inputChangeEvent
   */
  onInputChange(inputChangeEvent) {
    let equalPosition = inputChangeEvent.target.value.indexOf('v=');
    this.youTubeVideoId = inputChangeEvent.target.value.slice(equalPosition+2);
    this.showVideoBg = true;
  }

  /**
   * При нажатии на копку отображает блок с превью видео и меняет текст кнопки.
   * @param buttonClickEvent
   */
  onClickButton(buttonClickEvent){
    if(buttonClickEvent.target.innerText == 'Показать') {
      this.renderer.selectRootElement('.video__youtube').style.display= 'block';
      buttonClickEvent.target.innerText = 'Скрыть';
    } else {
      this.renderer.selectRootElement('.video__youtube').style.display= 'none';
      buttonClickEvent.target.innerText = 'Показать';
    }

  }
}
