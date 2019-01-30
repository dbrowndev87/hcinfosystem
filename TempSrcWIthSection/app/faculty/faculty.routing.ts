import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin, AuthGuardStudent } from '../login/authGuard';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';


const routes: Routes = [
    { path: 'faculty/list', component: FacultyListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'faculty/update/:id', component: FacultyUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FacultyRoutingModule { }