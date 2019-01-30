import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseUpdateComponent } from './course-update/course-update.component';

const routes: Routes = [
    { path: 'course/create', component: CourseCreateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'course/list', component: CourseListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'course/update/:id', component: CourseUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class CourseRoutingModule { }