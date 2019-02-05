import { DatepickerDirective } from './directives/datepicker.directive';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorModalComponent } from './modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './modals/success-modal/success-modal.component';
import { RandomUserPassGen } from './tools/rupg';
import { StudentIdGenerator } from './tools/sidg';
import { TransactionIdGenerator } from './tools/tidg';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { ReportIdGenerator } from './tools/ridg';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,

  ],
  declarations: [
    ErrorModalComponent,
    SuccessModalComponent,
    ConfirmModalComponent,
    DatepickerDirective,
    ConfirmModalComponent,
  ],
  exports: [
    ErrorModalComponent,
    SuccessModalComponent,
    ConfirmModalComponent,
    DatepickerDirective,
    DataTableDirective,
  ],
  providers: [
    RandomUserPassGen,
    StudentIdGenerator,
    TransactionIdGenerator,
    ReportIdGenerator
  ],


})
export class SharedModule { }