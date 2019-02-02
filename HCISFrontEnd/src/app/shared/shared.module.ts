import { DatepickerDirective } from './directives/datepicker.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { RandomUserPassGen } from './tools/rupg';
import { StudentIdGenerator } from './tools/sidg';
import { TransactionIdGenerator } from './tools/tidg';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,

  ],
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective,
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    DatepickerDirective,
    DataTableDirective,
  ],
  providers: [
    RandomUserPassGen,
    StudentIdGenerator,
    TransactionIdGenerator,
  ]

})
export class SharedModule { }