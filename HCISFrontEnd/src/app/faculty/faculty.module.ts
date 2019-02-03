import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from '../student/student.routing';
import { FacultyGradesComponent } from './faculty-grades/faculty-grades.component';
import { FacultyRosterComponent } from './faculty-roster/faculty-roster.component';

@NgModule({
  declarations: [
    FacultyListComponent,
    FacultyUpdateComponent,
    FacultyGradesComponent,
    FacultyRosterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class FacultyModule { }
