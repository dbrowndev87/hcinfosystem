import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin, AuthGuardFaculty } from '../login/authGuard';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyUpdateComponent } from './faculty-update/faculty-update.component';
import { FacultyGradesComponent } from './faculty-grades/faculty-grades.component';
import { FacultyRosterComponent } from './faculty-roster/faculty-roster.component';
import { FacultyHomeComponent } from './faculty-home/faculty-home.component';


const routes: Routes = [
    { path: 'faculty/list', component: FacultyListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'faculty/update/:id', component: FacultyUpdateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'faculty/grades/:studentId/:sectionId', component: FacultyGradesComponent, canActivate: [AuthGuardFaculty] },
    { path: 'faculty/roster', component: FacultyRosterComponent, canActivate: [AuthGuardFaculty] },
    { path: 'faculty/home', component: FacultyHomeComponent, canActivate: [AuthGuardFaculty] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class FacultyRoutingModule { }