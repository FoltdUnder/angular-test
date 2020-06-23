import {Component, DoCheck, OnInit}         from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit, DoCheck {
  public creditForm = new FormGroup({
    sum: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
    percent: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
    years: new FormControl(null, [Validators.required]),
    period: new FormControl('')
  });
  public paymentsArray: object[];
  public tableHeaders = ['Месяц', 'Остаток кредита', 'Основной платёж', 'Процент банку', 'Ежемесячный платёж'];
  public months: number;
  public period: number;

  ngOnInit(): void {
  }

  ngDoCheck() {
  }

  /**
   * Проверка поля ввода, если оно невалидно то появляется подсказка с форматом ввода
   * @param field - название FormControl
   */
  isFieldValid(field: string) {
    return !this.creditForm.get(field).valid && !this.creditForm.get(field).pristine;
  }

  /**
   * Если форма валидна то устанавливаюстя свойства для дальнейших расчётов,
   * если нет - границы невалидных полей становятся красными.
   */
  onSubmit() {
    if (this.creditForm.valid === true) {
      this.months = this.creditForm.value.years.slice(0, 1) * 12;
      this.period = this.months;
      this.paymentsArray = this.getPaymentsArray();
    } else {
      let pristine = document.querySelectorAll('.ng-pristine');
      pristine.forEach(field => {
        if (field.tagName !== 'FORM') {
          field.style.borderColor = 'red';
        }
      });
    }
  }

  onPeriodChange(event) {
    this.period = event.target.value;
  }

  /**
   * Округление до сотых если в поле есть точка
   * @param event
   */
  onInputBlur(event) {
    let fieldName = event.target.getAttribute('ng-reflect-name');
    if (event.target.value.indexOf('.') !== -1 && fieldName === 'percent') {
      event.target.value = event.target.value.slice(0, event.target.value.indexOf('.') + 3);
    }
    if (this.creditForm.get(fieldName).valid) {
      event.target.style.borderColor = '';
    }
  }

  /**
   * Вычисление месячного платежа
   */
  getMonthlyPayment(): number {
    const sum: number = this.creditForm.value.sum;
    const p: number = this.creditForm.value.percent / 1200;
    return sum * (p + (p / (((1 + p) ** this.months) - 1)));
  }

  /**
   * Вычисление данных для построения таблицы выплат
   */
  getPaymentsArray(): object[] {
    let monthlyPayment = this.getMonthlyPayment();
    let balance: number = this.creditForm.value.sum;
    let monthlyBankPart: number = (balance * this.creditForm.value.percent / 100) / 12;
    let monthlyDebtPart: number = monthlyPayment - monthlyBankPart;
    let paymentsArray: object[] = [];
    for (let i = 0; i < this.months; i++) {
      monthlyBankPart = (balance * this.creditForm.value.percent / 100) / 12;
      monthlyDebtPart = monthlyPayment - monthlyBankPart;
      paymentsArray.push({
        balance: balance.toFixed(2),
        monthlyPayment: (monthlyBankPart + monthlyDebtPart).toFixed(2),
        bankPart: monthlyBankPart.toFixed(2),
        debtPart: monthlyDebtPart.toFixed(2)
      });
      balance -= monthlyDebtPart;
    }
    return paymentsArray;
  }
}
