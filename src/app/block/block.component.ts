import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {StylesService} from '../styles.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit, OnDestroy {
  private unListenMouseMove: () => void;
  private unListenMouseUp: () => void;
  private unListenMouseOut: () => void;
  public stylesList: Array<string> = [];

  constructor(private renderer: Renderer2, private router: Router, private stylesService: StylesService) {
  }

  ngOnInit(): void {
  }
  ngOnDestroy() {
    if (this.unListenMouseMove) {
      this.unListenMouseMove();
      this.unListenMouseUp();
      this.unListenMouseOut();
    }
  }

  /**
   * обратка нажатия на кнопку сохранения
   * @param clickSave - ивент нажатия кнопки "Сохранить"
   */
  onClickSave(clickSave: MouseEvent): void {
    const block = this.renderer.selectRootElement('.block');
    const blockStyles = getComputedStyle(block);
    this.stylesList = [];
    this.stylesList.push('width: ' + blockStyles.width);
    this.stylesList.push('height: ' + blockStyles.height);
    this.stylesList.push('left: ' + blockStyles.left);
    this.stylesList.push('top: ' + blockStyles.top);
    this.stylesService.setStylesList(this.stylesList);
    this.router.navigate(['home/block/save']);
  }

  /**
   * Обработчик нажатия кнопки мыши на блок
   * @param mouseDownEvent - ивент нажатия кнопки мыши на блок
   */
  onMouseDownBlock(mouseDownEvent: MouseEvent): void {
    const block = this.renderer.selectRootElement('.block');
    const blockPosition = block.getBoundingClientRect();
    const indentX = mouseDownEvent.clientX - blockPosition.left;
    const indentY = mouseDownEvent.clientY - blockPosition.top;
    block.style.border = '50px double green';
    /**
     * Обработчик движения мыши в зависимости от позиции нажатия
     * если клик в 50px от края, то блок растягивается относительно границы
     * @param mouseMoveEvent - ивент движения мыши
     */
    this.unListenMouseMove = this.renderer.listen(block, 'mousemove', mouseMoveEvent => {
      let currentAxisSize: number;
      switch (getClickPosition()) {
        case 'left':
          currentAxisSize = blockPosition.width - (mouseMoveEvent.pageX - mouseDownEvent.pageX) * 2;
          this.renderer.setStyle(block, 'width', currentAxisSize + 'px');
          if (currentAxisSize >= 150) {
            this.renderer.setStyle(block, 'left', blockPosition.left + (mouseMoveEvent.pageX - mouseDownEvent.pageX) + 'px');
          }
          break;
        case 'right':
          currentAxisSize = blockPosition.width + (mouseMoveEvent.pageX - mouseDownEvent.pageX) * 2;
          this.renderer.setStyle(block, 'width', currentAxisSize + 'px');
          if (currentAxisSize >= 150) {
            this.renderer.setStyle(block, 'left', blockPosition.left - (mouseMoveEvent.pageX - mouseDownEvent.pageX) + 'px');
          }
          break;
        case 'top':
          currentAxisSize = blockPosition.height - (mouseMoveEvent.pageY - mouseDownEvent.pageY) * 2;
          this.renderer.setStyle(block, 'height', currentAxisSize + 'px');
          if (currentAxisSize >= 150) {
            this.renderer.setStyle(block, 'top', blockPosition.top + (mouseMoveEvent.pageY - mouseDownEvent.pageY) + 'px');
          }
          break;
        case 'bottom':
          currentAxisSize = blockPosition.height + (mouseMoveEvent.pageY - mouseDownEvent.pageY) * 2;
          this.renderer.setStyle(block, 'height', currentAxisSize + 'px');
          if (currentAxisSize >= 150) {
            this.renderer.setStyle(block, 'top', blockPosition.top - (mouseMoveEvent.pageY - mouseDownEvent.pageY) + 'px');
          }
          break;
        case 'notABorder':
          this.renderer.setStyle(block, 'left', mouseMoveEvent.pageX - indentX + 'px');
          this.renderer.setStyle(block, 'top', mouseMoveEvent.pageY - indentY + 'px');
          break;
      }
    });
    /**
     * При срабатывынии удаляет ивент движения мыши
     * @param mouseUpEvent - ивент отпускания кнопки мыши
     */
    this.unListenMouseUp = this.renderer.listen(block, 'mouseup', mouseUpEvent => {
      this.unListenMouseMove();
      block.style.border = '50px double orange';
    });
    /**
     * При выходе за границы блока удаляет ивент движения мыши
     * @param - ивент выхода за границы блока
     */
    this.unListenMouseOut = this.renderer.listen(block, 'mouseout', mouseOutEvent => {
      this.unListenMouseMove();
      block.style.border = '50px double orange';
    });

    /**
     * Возвращает позицию клика относительно блока
     * @return строка со значением позиции клика
     */
    function getClickPosition() {
      let border = 'notABorder';
      if (mouseDownEvent.pageX < blockPosition.x + 50) {
        border = 'left';
      }
      if (mouseDownEvent.pageX > blockPosition.x + blockPosition.width - 50) {
        border = 'right';
      }
      if (mouseDownEvent.pageY < blockPosition.y + 50) {
        border = 'top';
      }
      if (mouseDownEvent.pageY > blockPosition.y + blockPosition.height - 50) {
        border = 'bottom';
      }
      return border;
    }
  }
}
