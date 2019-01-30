/**
 * This is the Admin routing which is used to store ann the paths
 * which pertain to the components of this section.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { AdminListComponent } from './admin-list/admin-list.component';

const routes: Routes = [
    { path: 'admin/update/:id', component: AdminUpdateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'admin/list', component: AdminListComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }