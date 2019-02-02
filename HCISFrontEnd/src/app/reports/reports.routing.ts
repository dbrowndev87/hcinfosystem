import { CourseCatalogueComponent } from './course-catalogue/course-catalogue.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { StudentListingComponent } from './student-listing/student-listing.component';

const routes: Routes = [
    { path: 'reports/studentListing', component: StudentListingComponent, canActivate: [AuthGuardAdmin] },
    { path: 'reports/courseCatalogue', component: CourseCatalogueComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }