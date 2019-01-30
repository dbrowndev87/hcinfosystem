import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { EnrollmentUpdateComponent } from './enrollment-update/enrollment-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EnrollmentListComponent,
    EnrollmentUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class EnrollmentModule { }
