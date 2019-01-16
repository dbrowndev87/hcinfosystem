import { DatepickerDirective } from './directives/datepicker.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { RandomUserPassGen } from './tools/rupg';
import { StudentIdGenerator } from './tools/sidg';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective,
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective
  ],
  providers: [
    RandomUserPassGen,
    StudentIdGenerator
  ]

})
export class SharedModule { }