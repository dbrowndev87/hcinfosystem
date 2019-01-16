import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentCreateComponent } from './student-create/student-create.component';
import { StudentDeleteComponent } from './student-delete/student-delete.component';
import { StudentUpdateComponent } from './student-update/student-update.component';

const routes: Routes = [
    { path: 'student/list', component: StudentListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'student/create', component: StudentCreateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'sudent/delete/:id', component: StudentDeleteComponent, canActivate: [AuthGuardAdmin] },
    { path: 'student/update/:id', component: StudentUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class StudentRoutingModule { }