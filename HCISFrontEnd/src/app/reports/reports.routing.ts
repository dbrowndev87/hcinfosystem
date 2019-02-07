import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueReportComponent } from './course-catalogue-report/course-catalogue-report.component';
import { StudentListingReportComponent } from './student-listing-report/student-listing-report.component';
import { FacultyCoursesComponent } from './faculty-courses/faculty-courses.component';
import { FacultyCoursesReportComponent } from './faculty-courses-report/faculty-courses-report.component';
import { StudentTranscriptReportComponent } from './student-transcript-report/student-transcript-report.component';
import { StudentTranscriptComponent } from './student-transcript/student-transcript.component';
import { AuthGuardAdminStudent } from '../login/authGuard/auth-admin-student.guard';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { StudentCoursesReportComponent } from './student-courses-report/student-courses-report.component';
import { BillStudentComponent } from './bill-student/bill-student.component';
import { BillStudentReportComponent } from './bill-student-report/bill-student-report.component';

const routes: Routes = [
    { path: 'reports/studentlisting', component: StudentListingComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studentlisting/report/:id', component: StudentListingReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studenttranscript', component: StudentTranscriptComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studenttranscript/report/:id', component: StudentTranscriptReportComponent, canActivate: [AuthGuardAdminStudent] },
    { path: 'reports/coursecatalogue', component: CourseCatalogueComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/coursecatalogue/report/:id', component: CourseCatalogueReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/facultycourses', component: FacultyCoursesComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/facultycourses/report/:id', component: FacultyCoursesReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studentcourses', component: StudentCoursesComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studentcourses/report/:id', component: StudentCoursesReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/billstudent', component: BillStudentComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/billstudent/report/:id', component: BillStudentReportComponent, canActivate: [AuthGuardAdmin] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }