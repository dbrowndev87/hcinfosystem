import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { RandomUserPassGen } from 'src/app/shared/tools/rupg';
import { StudentIdGenerator } from 'src/app/shared/tools/sidg';
import { Course } from 'src/app/_interfaces/course.model';
import { Department } from 'src/app/_interfaces/department.model';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  public errorMessage = "";
  public courseForm: FormGroup;
  private depts: Department[];
  @ViewChild('dCode') dCode: ElementRef;


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.courseForm = new FormGroup({
      course_Id: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      course_Name: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      dept_Id: new FormControl('', [Validators.required]),
      credits: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1)]),
    });

    // get all departments.
    this.getAllDepartments();

  }

  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
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

  public createCourse(courseFormValue) {
    if (this.courseForm.valid) {
      this.executeCourseCreation(courseFormValue);
    }
  }


  private executeCourseCreation(courseFormValue) {

    // Make a user interface.
    let course: Course = {
      course_Id: courseFormValue.course_Id,
      course_Name: courseFormValue.course_Name,
      dept_Id: parseInt(courseFormValue.dept_Id, 0),
      credits: parseInt(courseFormValue.credits, 0)
    };

    // Create user
    let apiUrl = 'api/course';
    this.repository.create(apiUrl, course)
      .subscribe(res => {
        $('#successModal').modal();
      },
        // User create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToUserList() {
    this.router.navigate(['/courses/list']);
  }

}

