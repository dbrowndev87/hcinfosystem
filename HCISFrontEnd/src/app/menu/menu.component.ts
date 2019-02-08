/**
 * Name: Menu Component
 * Description: This contains all the functions which pertain to the applications
 * menu.
 * 
 * Author: Darcy Brown
 * Date: January 20th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { RepositoryService } from '../shared/services/repository.service';
import { Student } from '../_interfaces/student.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  private typeCode = 0;
  private student: Student;
  private loggedIn = false;
  private userId = 0;
  private studentId;
  private facultyId;
  private errorMessage = "";
  private showRegister = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
  ) {
    if (sessionStorage.getItem('userId')) {
      this.userId = parseInt(sessionStorage.getItem('userId'), 0);
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('typeCode')) {
      this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    }

    if (sessionStorage.getItem('isLoggedIn')) {
      this.loggedIn = true;

      if (sessionStorage.getItem('studentId')) {
        this.studentId = parseInt(sessionStorage.getItem('studentId'), 0);
      }

      if (sessionStorage.getItem('facultyId')) {
        this.facultyId = parseInt(sessionStorage.getItem('facultyId'), 0);
      }
    }

    if (this.typeCode === 3) {

      let apiAddress = "api/student/" + this.studentId;
      this.subscriptions.push(this.repository.getData(apiAddress)
        .subscribe(res => {
          this.student = res as Student;
          // console.log(this.student);
        },
          // tslint:disable-next-line: no-unused-expression
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = this.errorHandler.errorMessage;

          }).add(() => {
            if (this.student.student_Status === "Enrolled") {
              // authorised so return true
              this.showRegister = true;
            }
          }));
    }
  }
}
