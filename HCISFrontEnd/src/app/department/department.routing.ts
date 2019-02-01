import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentUpdateComponent } from './department-update/department-update.component';

const routes: Routes = [
    { path: 'department/create', component: DepartmentCreateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'department/list', component: DepartmentListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'department/update/:id', component: DepartmentUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class DepartmentRoutingModule { }