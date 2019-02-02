import { ErrorHandlerService } from './shared/services/error-handler.service';
import { RepositoryService } from './shared/services/repository.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
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
import { UserLoginRoutingModule } from './userlogin/userlogin.routing';
import { UserLoginModule } from './userlogin/userlogin.module';
import { CourseModule } from './courses/course.module';
import { CourseRoutingModule } from './courses/course.routing';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin.routing';
import { FacultyModule } from './faculty/faculty.module';
import { FacultyRoutingModule } from './faculty/faculty.routing';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { EnrollmentRoutingModule } from './enrollment/enrollment.routing';
import { SectionModule } from './section/section.module';
import { SectionRoutingModule } from './section/section.routing';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { DepartmentModule } from './department/department.module';
import { DepartmentRoutingModule } from './department/department.routing';
import { ReportsModule } from './reports/reports.module';
import { ReportsRoutingModule } from './reports/reports.routing';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    MenuComponent,
    HomeComponent,
    InternalServerComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    // Modules Start Here
    UserModule,
    UserRoutingModule,
    LoginModule,
    LoginRoutingModule,
    StudentModule,
    UserLoginModule,
    UserLoginRoutingModule,
    CourseModule,
    CourseRoutingModule,
    AdminModule,
    AdminRoutingModule,
    FacultyModule,
    FacultyRoutingModule,
    EnrollmentModule,
    EnrollmentRoutingModule,
    SectionModule,
    SectionRoutingModule,
    DepartmentModule,
    DepartmentRoutingModule,
    ReportsModule,
    ReportsRoutingModule,
    // These Must Go Last.
    RouterModule,
    AppRoutingModule,

  ],
  providers: [
    EnvironmentUrlService,
    RepositoryService,
    ErrorHandlerService,
    DatePipe,
    Globals,
    AuthGuardAdmin,
    AuthGuardFaculty,
    AuthGuardStudent,
  ],
  bootstrap: [AppComponent],
  exports: [
    MenuComponent,
  ]
})
export class AppModule { }
