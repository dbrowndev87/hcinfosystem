import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ConfirmEqualsValidator } from '../shared/validators/confirm-equals.validator';

@NgModule({
  declarations: [
    UserCreateComponent,
    UserListComponent,
    UserUpdateComponent,
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
