import {NgModule}     from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsRoutingModule}         from './forms-routing.module';
import {FormsComponent}             from './forms.component';
import {ReactiveFormsModule}        from '@angular/forms';
import {PeriodPipe}                 from '../period.pipe';
import {FieldDisplayErrorComponent} from '../field-display-error/field-display-error.component';

@NgModule({
  declarations: [FormsComponent, PeriodPipe, FieldDisplayErrorComponent],
  imports: [
    CommonModule,
    FormsRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FormsModule {
}
