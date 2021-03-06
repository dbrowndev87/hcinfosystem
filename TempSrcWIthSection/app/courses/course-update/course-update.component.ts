/**
 * Name: Course Update Component
 * Description: This is the Course Update component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 26th, 2019
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/_interfaces/course.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})

export class CourseUpdateComponent implements OnInit {

  public errorMessage = "";
  public courseForm: FormGroup;
  private depts: Department[];
  private course: Course;
  private userType: number;
  private isLoaded = false;
  @ViewChild('dCode') private dCode: ElementRef;


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.courseForm = new FormGroup({
      course_Id: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      course_Name: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      dept_Id: new FormControl(''),
      credits: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });

    this.userType = parseInt(sessionStorage.getItem('typeCode'), 0);
    // get all departments.
    this.getAllDepartments();
    this.getCourseById();
  }

  // Patch course to form.
  private getCourseById() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let courseByIdUrl = `api/course/${id}`;

    // get the course data and patch
    this.repository.getData(courseByIdUrl)
      .subscribe(res => {
        this.course = res as Course;
        this.courseForm.patchValue(this.course);
        this.isLoaded = true;
        let apiAddress = "api/department";

        // make the proper index value based on ID
        let index = this.course.dept_Id - 1;

        // set the Department select box.
        this.dCode.nativeElement.value = this.dCode.nativeElement.options[index].value;
        this.dCode.nativeElement.innderHTML = this.dCode.nativeElement.options[index].innerHTML;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        });
  }

  // get all departments to
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
        for (let x = 0; x < this.depts.length; x++) {
          if (this.depts[x].dept_Name === "Administration") {
            this.depts.splice(x, 1);
          }
        }
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public validateControl(controlName: string) {
    if (this.courseForm.controls[controlName].invalid && this.courseForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.courseForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public updateCourse(courseFromValue) {
    if (this.courseForm.valid) {
      this.executeCourseUpdate(courseFromValue);
    }
  }

  private executeCourseUpdate(courseFormValue) {
    let updateId = this.course.course_Id;

    this.course.course_Id = courseFormValue.course_Id;
    this.course.course_Name = courseFormValue.course_Name;
    this.course.dept_Id = this.dCode.nativeElement.value;
    this.course.credits = courseFormValue.credits;


    let apiUrl = `api/course/${updateId}`;
    this.repository.update(apiUrl, this.course)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );
  }

  public redirectToCourseList() {
    this.router.navigate(['/course/list']);
  }
}
