/**
 * This is the user routing which is used to store ann the paths
 * which pertain to the components of this section.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { AuthGuardAdmin } from '../login/authGuard';

const routes: Routes = [
    { path: 'user/create/:id', component: UserCreateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'user/list', component: UserListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'user/update/:id', component: UserUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }