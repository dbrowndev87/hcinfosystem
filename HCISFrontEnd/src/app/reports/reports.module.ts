import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';

@NgModule({
  declarations: [StudentListingComponent, CourseCatalogueComponent],
  imports: [
    CommonModule
  ]
})
export class ReportsModule { }
