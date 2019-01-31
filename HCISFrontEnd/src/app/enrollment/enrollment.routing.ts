/**
 * This is the login routing file which is used to store the routing
 * paths to the components of this section.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollmentListComponent } from './enrollment-list/enrollment-list.component';
import { AuthGuardAdmin } from '../login/authGuard';
import { EnrollmentUpdateComponent } from './enrollment-update/enrollment-update.component';


const routes: Routes = [
    { path: 'enrollment/list', component: EnrollmentListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'enrollment/update/:id', component: EnrollmentUpdateComponent, canActivate: [AuthGuardAdmin] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class EnrollmentRoutingModule { }