import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from '../student/student.routing';

@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class FacultyModule { }
