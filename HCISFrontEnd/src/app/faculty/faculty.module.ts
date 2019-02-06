import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from '../student/student.routing';
import { FacultyGradesComponent } from './faculty-grades/faculty-grades.component';
import { FacultyHomeComponent } from './faculty-home/faculty-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyUpdateComponent,
    FacultyGradesComponent,
    FacultyHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class FacultyModule { }
