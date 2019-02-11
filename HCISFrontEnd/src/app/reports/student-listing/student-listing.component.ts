/**
 * Name: Student Listing Component
 * Description: This is the page that allows you to pick the course or all
 * courses to generate the report about.
 * 
 * Author: Darcy Brown
 * Date: Febuary 5th, 2019
 */
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Subject, Subscription } from 'rxjs';
import { Course } from 'src/app/_interfaces/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';

@Component({
  selector: 'app-student-listing',
  templateUrl: './student-listing.component.html',
  styleUrls: ['./student-listing.component.css']
})
export class StudentListingComponent implements OnInit {

  public courses: Course[];
  public errorMessage: String = "";
  public studentListingForm: FormGroup;
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
    this.studentListingForm = new FormGroup({
      course_Id: new FormControl('', [Validators.required])
    });

    this.getAllCourseInfo();
    this.isLoaded = true;
  }


  public getAllCourseInfo() {

    let apiAddress = "api/course";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.courses = res as Course[];
        // console.log(this.courses);
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.studentListingForm.controls[controlName].invalid && this.studentListingForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentListingForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }


  public redirectToReport(formValue) {
    this.router.navigate(['/reports/studentlisting/report/' + formValue.course_Id]);
  }

  public redirectToAllReport(id) {
    this.router.navigate(['/reports/studentlisting/report/' + id]);
  }

  public goHome() {
    this.router.navigate(['/home']);
  }
}
