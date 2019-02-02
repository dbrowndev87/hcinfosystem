import { Course } from 'src/app/_interfaces/course.model';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-catalogue',
  templateUrl: './course-catalogue.component.html',
  styleUrls: ['./course-catalogue.component.css']
})
export class CourseCatalogueComponent implements OnInit {

  public courses: Course[];
  public errorMessage: String = "";
  private depts: Department[];
  private isLoaded = false;

   // Array for all the subscriptions
   private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getDepartments();
  }
  public getDepartments(){
    let apiAddress = "api/department/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
        this.isLoaded = true;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public getCoursesByDeptId(deptId){
    let apiAddress = "api/course/department/"+deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.courses = res as Course[];
        this.isLoaded = true;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
}
