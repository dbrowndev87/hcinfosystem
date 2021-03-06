import { Course } from 'src/app/_interfaces/course.model';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-faculty-courses',
  templateUrl: './faculty-courses.component.html',
  styleUrls: ['./faculty-courses.component.css']
})
export class FacultyCoursesComponent implements OnInit {

  public courses: Course[];
  public errorMessage: String = "";
  public facultyReportForm: FormGroup;
  public depts: Department[];
  public id: number;
  public isLoaded = false;

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];


  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,

  ) { }

  ngOnInit() {

    this.facultyReportForm = new FormGroup({
      dept_Id: new FormControl('', [Validators.required])
    });

    this.getAllDepartments();
    this.isLoaded = true;
  }
  public getAllDepartments() {

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

  public validateControl(controlName: string) {
    if (this.facultyReportForm.controls[controlName].invalid && this.facultyReportForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.facultyReportForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }


  public redirectToReport(formValue) {
    this.router.navigate(['/reports/facultycourses/report/' + formValue.dept_Id]);
  }

  public redirectToAllReport(id) {
    this.router.navigate(['/reports/facultycourses/report/' + id]);
  }

}
