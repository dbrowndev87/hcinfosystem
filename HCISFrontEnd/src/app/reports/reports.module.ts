import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { CourseCatalogueReportComponent } from './course-catalogue-report/course-catalogue-report.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentListingComponent,
    CourseCatalogueComponent,
    CourseCatalogueReportComponent
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
