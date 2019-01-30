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
import { AuthGuardAdmin } from '../login/authGuard';

const routes: Routes = [
    { path: 'user/create/:id', component: UserCreateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }