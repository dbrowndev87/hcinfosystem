/**
 * Name: Course List Component
 * Description: This is the Course List component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 26th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/_interfaces/department.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Course> = new Subject<Course>();

  public courses: Course[];
  public depts: Department[];
  public deptNames: string[];
  public errorMessage: String = "";
  public isLoaded = false;

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllCourses();
    this.getAllDepartments();
    this.isLoaded = true;
    console.log(this.courses);
  }

  public getAllCourses() {
    let apiAddress = "api/course";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(courses => {
        this.courses = courses as Course[];
        this.dtTrigger.next();
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }));
  }

  public getAllDepartments() {
    let apiAddress = "api/department";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        },
        // tslint:disable-next-line: no-unused-expression
        () => {
          this.loaded();
        }));
  }

  public loaded() {
    this.isLoaded = true;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/course/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}