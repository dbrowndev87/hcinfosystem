import { StudentListComponent } from './student-list/student-list.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentRoutingModule } from './student.routing';




@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ],
  declarations: [
    StudentListComponent,
    StudentUpdateComponent
  ]
})
export class StudentModule { }