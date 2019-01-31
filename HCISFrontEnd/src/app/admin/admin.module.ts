import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminUpdateComponent } from './admin-update/admin-update.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from '../student/student.routing';

@NgModule({
  declarations: [
    AdminListComponent,
    AdminUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentRoutingModule
  ]
})
export class AdminModule { }
