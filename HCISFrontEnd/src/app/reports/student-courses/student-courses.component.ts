import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Semesters } from 'src/app/shared/tools/semesters';

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
  private semesters = new Semesters().getSemesters;
  private year = new Date().getFullYear();
  private range: any[] = [];
  private years: any[] = [];
  private depts: Department[];

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,

  ) { }

  ngOnInit() {

    for (var i = 1; i < 7; i++) {
        this.range.push(this.year+2 - i);
    }
    this.years = this.range;

    this.studentCoursesForm = new FormGroup({
      semester: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      dept_Id: new FormControl('', [Validators.required]),
    });
    this.getAllDepartments();
    this.isLoaded = true;
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
  private getAllDepartments() {

    let apiAddress = "api/department/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];

        for (let x = 0; x < this.depts.length; x++) {
          if (this.depts[x].dept_Id === 1) {
            this.depts.splice(x, 1);
          }
        }

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  private redirectToReport(formValue) {
  
    this.router.navigate(['/reports/studentcourses/report/' + formValue.semester + '/'+ formValue.year+'/'+formValue.dept_Id]);
  }

  // private redirectToAllReport(id) {
  //   this.router.navigate(['/reports/studentcourses/report/' + id]);
  // }

  private goHome() {
    this.router.navigate(['/home']);
  }
}
