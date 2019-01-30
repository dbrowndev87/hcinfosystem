import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardAdmin } from '../login/authGuard';
import { SectionCreateComponent } from './section-create/section-create.component';
import { SectionListComponent } from './section-list/section-list.component';
import { SectionUpdateComponent } from './section-update/section-update.component';

const routes: Routes = [
    { path: 'section/create', component: SectionCreateComponent, canActivate: [AuthGuardAdmin] },
    { path: 'section/list', component: SectionListComponent, canActivate: [AuthGuardAdmin] },
    { path: 'section/update/:id', component: SectionUpdateComponent, canActivate: [AuthGuardAdmin] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SectionRoutingModule { }