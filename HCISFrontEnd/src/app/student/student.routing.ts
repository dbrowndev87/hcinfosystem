import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin, AuthGuardStudent } from '../login/authGuard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentUpdateComponent } from './student-update/student-update.component';
import { StudentPaymentComponent } from './student-payment/student-payment.component';

const routes: Routes = [
    { path: 'student/list', component: StudentListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'student/update/:id', component: StudentUpdateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'student/payment', component: StudentPaymentComponent, canActivate: [AuthGuardStudent] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }