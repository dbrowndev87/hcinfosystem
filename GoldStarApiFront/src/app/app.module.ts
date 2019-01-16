import { ErrorHandlerService } from './shared/services/error-handler.service';
import { RepositoryService } from './shared/services/repository.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component'
import { EnvironmentUrlService } from './shared/services/environment-url.service';
import { HttpClientModule } from '@angular/common/http';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { DatePipe, CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { UserRoutingModule } from './user/user.routing';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/login.routing';
import { Globals } from './globals';
import { AuthGuardAdmin } from './login/authGuard';
import { AuthGuardFaculty } from './login/authGuard/auth-faculty.guard';
import { AuthGuardStudent } from './login/authGuard/auth-student.guard';
import { StudentModule } from './student/student.module';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MenuComponent,
    HomeComponent,
    InternalServerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    UserModule,
    UserRoutingModule,
    LoginModule,
    LoginRoutingModule,
    StudentModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    EnvironmentUrlService,
    RepositoryService,
    ErrorHandlerService,
    DatePipe,
    Globals,
    AuthGuardAdmin,
    AuthGuardFaculty,
    AuthGuardStudent
  ],
  bootstrap: [AppComponent],
  exports: [MenuComponent]
})
export class AppModule { }
