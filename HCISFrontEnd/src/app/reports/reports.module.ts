import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { CourseCatalogueReportComponent } from './course-catalogue-report/course-catalogue-report.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentListingReportComponent } from './student-listing-report/student-listing-report.component';
import { StudentTranscriptComponent } from './student-transcript/student-transcript.component';
import { StudentTranscriptReportComponent } from './student-transcript-report/student-transcript-report.component';
import { FacultyCoursesComponent } from './faculty-courses/faculty-courses.component';
import { FacultyCoursesReportComponent } from './faculty-courses-report/faculty-courses-report.component';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentCoursesReportComponent } from './student-courses-report/student-courses-report.component';
import { BillStudentComponent } from './bill-student/bill-student.component';
import { BillStudentReportComponent } from './bill-student-report/bill-student-report.component';

@NgModule({
  declarations: [
    StudentListingComponent,
    CourseCatalogueComponent,
    CourseCatalogueReportComponent,
    StudentListingReportComponent,
    StudentTranscriptComponent,
    StudentTranscriptReportComponent,
    FacultyCoursesComponent,
    FacultyCoursesReportComponent,
    StudentCoursesComponent,
    StudentCoursesReportComponent,
    BillStudentComponent,
    BillStudentReportComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
