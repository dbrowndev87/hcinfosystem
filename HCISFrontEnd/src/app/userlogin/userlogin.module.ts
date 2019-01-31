import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserloginUpdateComponent } from './userlogin-update/userlogin-update.component';
import { UserloginListComponent } from './userlogin-list/userlogin-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserloginUpdateComponent,
    UserloginListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class UserLoginModule { }
