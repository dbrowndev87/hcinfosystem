import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  public students: StudentInfo[];
  public errorMessage: String = "";
  private studentCoursesForm: FormGroup;
  private id: number;
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,

  ) { }

  ngOnInit() {

    this.studentCoursesForm = new FormGroup({
      student_Id: new FormControl('', [Validators.required])
    });

    this.getAllStudents();
    this.isLoaded = true;
  }

  private getAllStudents() {

    let apiAddress = "api/studentInfo/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.students = res as StudentInfo[];

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.studentCoursesForm.controls[controlName].invalid && this.studentCoursesForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentCoursesForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }


  private redirectToReport(formValue) {
    this.router.navigate(['/reports/studentcourses/report/' + formValue.student_Id]);
  }

  private redirectToAllReport(id) {
    this.router.navigate(['/reports/studentcourses/report/' + id]);
  }

  private goHome() {
    this.router.navigate(['/home']);
  }
}
