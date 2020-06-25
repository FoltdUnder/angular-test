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
    serverMethod: new FormControl(null,
      [Validators.required, Validators.pattern(/^\w+$/)]),
    sendMethod: new FormControl(null,
      [Validators.required]),
    data: new FormControl(null,
      [Validators.required]),
  });
  public response;
  public body = null;
  public headers;
  public status;
  public json;
  public isRequestError = false;
  public responseTime;
  constructor(private server: ServerService) {
  }

  ngOnInit(): void {
  }

  /**
   * Выполняет запрос если форма валидна или выделяет красной рамкой невалидные поля ввода
   */
  onSubmit() {
    let startDate = new Date();
    let formMethod = this.serverForm.value.serverMethod;
    let formData = this.serverForm.value.data;
    if (this.serverForm.valid === true) {
      if (this.serverForm.value.sendMethod === 'POST') {
        this.server.postData(formMethod, formData).pipe(timeout(20000), retry(2)).subscribe(response => {
          // @ts-ignore
            this.responseTime = Math.abs(new Date() - startDate) % 20000;
            this.isRequestError = false;
            this.response = response;
            const keys = this.response.headers.keys();
            this.body = this.response.body;
            this.headers = keys.map(key => `${key}: ${this.response.headers.get(key)}`);
            this.json = JSON.stringify(this.body.data.data, null, 4);
            this.json = this.json.split('\\n').join('<br>').split('\\').join('');
          },
          () => this.isRequestError = true
        );
      } else {
        this.server.getData(formMethod, formData).pipe(timeout(20000), retry(2)).subscribe(response => {
            // @ts-ignore
            this.responseTime = Math.abs(new Date() - startDate) % 20000;
            this.isRequestError = false;
            this.response = response;
            const keys = this.response.headers.keys();
            this.body = this.response.body;
            this.headers = keys.map(key => `${key}: ${this.response.headers.get(key)}`);
            this.json = JSON.stringify(this.body.data.data, null, 4);
            this.json = this.json.split(/{|}|,|[|]/).join('<br>').split('\\').join('');
          },
          () => this.isRequestError = true
        );
      }
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
