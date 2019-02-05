import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { StudentListingComponent } from './student-listing/student-listing.component';
import { CourseCatalogueReportComponent } from './course-catalogue-report/course-catalogue-report.component';
import { StudentListingReportComponent } from './student-listing-report/student-listing-report.component';

const routes: Routes = [
    { path: 'reports/studentlisting', component: StudentListingComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/studentlisting/report/:id', component: StudentListingReportComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/coursecatalogue', component: CourseCatalogueComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/coursecatalogue/report/:id', component: CourseCatalogueReportComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }