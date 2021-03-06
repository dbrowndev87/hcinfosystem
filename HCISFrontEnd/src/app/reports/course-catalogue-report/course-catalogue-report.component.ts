/**
 * Name: Course Catalogue Report C0mponent
 * Description: This is the course catalogue report which generates
 * the data based on the department you chose.
 * 
 * Author: Darcy Brown
 * Date: Febuary 4th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_interfaces/user.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { ReportIdGenerator } from 'src/app/shared/tools/ridg';

@Component({
  selector: 'app-course-catalogue-report',
  templateUrl: './course-catalogue-report.component.html',
  styleUrls: ['./course-catalogue-report.component.css']
})
export class CourseCatalogueReportComponent implements OnInit {


  public courses: any[] = [];
  public errorMessage: String = "";
  public depts: any = [];
  public user: User;
  public id: number;
  public isLoaded = false;
  public semesters = new Semesters();
  public counter = 0;

  public reportId = "";
  public reportDate;
  public reportFor = "";

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];


  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public activeatedRoute: ActivatedRoute,
    public reportIDGen: ReportIdGenerator
  ) { }

  ngOnInit() {

    // Get the ID comming in from the URL, todays date, and generate a
    // report ID prefixed 'CC'
    this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
    this.reportDate = this.semesters.getTodaysDate();
    this.reportId = this.reportIDGen.generateId('CC');

    // Get the user information
    this.getUser();

    // If 0 is passed in thats all departments
    if (this.id === 0) {
      this.getAllDepartments();
    } else {
      // Otherwise get department by ID
      this.getDepartment();
    }
  }


  /**
   * Get all the departments to geenrate the report with
   */
  public getDepartment() {
    let apiAddress = "api/department/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {

        // If its jsut one push it to the 0 index.
        if (this.id === 0) {
          this.depts = res as Department[];
        } else {
          this.depts[0] = res as Department[];
        }


        // console.log(this.depts);
        this.getCoursesByDeptId(this.id);

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  /**
   * Gets the user information from the API
   */
  public getUser() {
    let apiAddress = "api/user/" + sessionStorage.getItem('userId');
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {
        this.user = res as User;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  /**
   * This gets all the departments and splices out the Administration
   * department.
   */
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];

        // console.log(this.depts);

        // Remove Administrator
        for (let x = 0; x < this.depts.length; x++) {
          if (this.depts[x].dept_Id === 1) {
            this.depts.splice(x, 1);
          }
        }

        // Get the courses for the
        this.depts.forEach(depts => {
          this.getCoursesByDeptId(depts.dept_Id);
          this.counter++;
        });

      })),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  /**
   *  Get the courses for a departments By department ID
   * @param deptId
   */
  public getCoursesByDeptId(deptId) {
    let apiAddress = "api/course/department/" + deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let courses = res as Course[];
        let tempCourses: Course[] = [];

        courses.forEach(course => {
          tempCourses.push(course);
        });

        // If all courses set the ID
        if (this.id === 0) {
          this.courses[deptId - 2] = tempCourses;
        } else {
          // Else 0
          this.courses[0] = tempCourses;
        }

        // Set isLoaded to true.
        this.isLoaded = true;

        // console.log(this.courses);

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public backToReportGenerator() {
    this.router.navigate(['/reports/coursecatalogue']);
  }


}
