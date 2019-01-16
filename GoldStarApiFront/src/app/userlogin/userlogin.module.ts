import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserloginUpdateComponent } from './userlogin-update/userlogin-update.component';
import { UserloginDeleteComponent } from './userlogin-delete/userlogin-delete.component';
import { UserloginListComponent } from './userlogin-list/userlogin-list.component';
import { UserloginCreateComponent } from './userlogin-create/userlogin-create.component';

@NgModule({
  declarations: [UserloginUpdateComponent, UserloginDeleteComponent, UserloginListComponent, UserloginCreateComponent],
  imports: [
    CommonModule
  ]
})
export class UserloginModule { }
