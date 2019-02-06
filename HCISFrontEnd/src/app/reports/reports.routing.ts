import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueReportComponent } from './course-catalogue-report/course-catalogue-report.component';
import { StudentListingReportComponent } from './student-listing-report/student-listing-report.component';
import { FacultyCoursesComponent } from './faculty-courses/faculty-courses.component';
import { FacultyCoursesReportComponent } from './faculty-courses-report/faculty-courses-report.component';

const routes: Routes = [
    { path: 'reports/studentlisting', component: StudentListingComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studentlisting/report/:id', component: StudentListingReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/coursecatalogue', component: CourseCatalogueComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/coursecatalogue/report/:id', component: CourseCatalogueReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/facultycourses', component: FacultyCoursesComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/facultycourses/report/:id', component: FacultyCoursesReportComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }