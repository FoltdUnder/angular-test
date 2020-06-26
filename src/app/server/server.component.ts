import {Component, OnInit}                  from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ServerService}                      from '../server.service';
import {retry, timeout}                     from 'rxjs/operators';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {
  public serverForm = new FormGroup({
    serverMethod: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    sendMethod: new FormControl(null,
      [Validators.required]),
    data: new FormControl(null,
      [Validators.required, Validators.pattern(/\{([^\{.\}]|[\n\r]*)*\}/)])
  });
  public response;
  public body = null;
  public headers;
  public status;
  public json;
  public isRequestError = false;
  public responseTime;
  public isNested: boolean;
  constructor(private server: ServerService) {
  }

  ngOnInit(): void {
  }

  /**
   * Выполняет запрос если форма валидна или выделяет красной рамкой невалидные поля ввода
   */
  onSubmit() {
    if (this.serverForm.value.data.split('{').length > 2 || this.serverForm.value.data.split('}').length > 2) {
      this.isNested = true;
      return;
    }
    this.isNested = false;

    if (this.serverForm.valid === true) {
      let startDate = new Date();
      let formMethod = this.serverForm.value.serverMethod;
      let sendMethod = this.serverForm.value.sendMethod;
      let formData = JSON.parse(this.serverForm.value.data);
      this.server.doRequest(sendMethod, formMethod, formData).subscribe(response => {
        // @ts-ignore
        this.responseTime = Math.abs(new Date() - startDate) % 20000;
        this.isRequestError = false;
        this.response = response;
        console.dir('response: ');
        console.dir(response);
        this.body = this.response.body;
        const keys = this.response.headers.keys();
        this.headers = keys.map(key => `${key}: ${this.response.headers.get(key)}`);
        this.json = JSON.stringify(this.body, null, 4);
      });
    } else {
      let pristine = document.querySelectorAll('.ng-pristine');
      pristine.forEach(field => {
        if (field.tagName !== 'FORM') {
          (field as HTMLElement).style.borderColor = 'red';
        }
      });
    }
  }

  /**
   * Проверка поля на валидность
   * @param field
   */
  isFieldValid(field: string) {
    return !this.serverForm.get(field).valid && !this.serverForm.get(field).pristine;
  }

  /**
   * Отменяет стиль для границ невалидных полей ввода
   * @param event
   */
  onInputBlur(event) {
    let fieldName = event.target.getAttribute('ng-reflect-name');
    if (this.serverForm.get(fieldName).valid) {
      event.target.style.borderColor = '';
    }
  }
}
