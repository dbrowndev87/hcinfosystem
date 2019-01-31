import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { UserloginListComponent } from './userlogin-list/userlogin-list.component';
import { UserloginUpdateComponent } from './userlogin-update/userlogin-update.component';

const routes: Routes = [
    { path: 'userlogin/list', component: UserloginListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'userlogin/update/:username', component: UserloginUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class UserLoginRoutingModule { }