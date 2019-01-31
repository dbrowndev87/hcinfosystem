/**
 * This is the login routing file which is used to store the routing
 * paths to the components of this section.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-component/login-component.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule { }