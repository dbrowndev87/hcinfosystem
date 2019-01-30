/**
 * This is the user module which is used to link all the components
 * and modules which are used in this user set of components.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ConfirmEqualsValidator } from '../shared/validators/confirm-equals.validator';


@NgModule({
  declarations: [
    UserCreateComponent,
    ConfirmEqualsValidator
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ]
})
export class UserModule { }
