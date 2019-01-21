import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/_interfaces/department.model';
import { deepStrictEqual } from 'assert';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  public courses: Course[];
  private depts: Department[];
  private deptNames: string[];
  public errorMessage: String = "";
  private isLoaded = false;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllCourses();
    this.getAllDepartments();
    this.isLoaded = true;
  }

  public getAllCourses() {
    let apiAddress = "api/course";
    this.repository.getData(apiAddress)
      .subscribe(courses => {
        this.courses = courses as Course[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
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

  public redirectToUpdatePage(id) {
    let updateUrl = `/course/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}