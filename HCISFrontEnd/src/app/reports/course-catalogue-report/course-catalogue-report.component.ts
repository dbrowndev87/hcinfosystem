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
  private depts: any = [];
  private user: User;
  private id: number;
  private isLoaded = false;
  private semesters = new Semesters();
  private counter = 0;

  private reportId = "";
  private reportDate;
  private reportFor = "";

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private reportIDGen: ReportIdGenerator
  ) { }

  ngOnInit() {

    this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
    this.reportDate = this.semesters.getTodaysDate();
    this.reportId = this.reportIDGen.generateId('CC');

    this.getUser();

    if (this.id === 0) {
      this.getAllDepartments();
    } else {
      this.getDepartment();

    }
  }


  private getDepartment() {
    let apiAddress = "api/department/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {

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

  private getUser() {
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

  private getAllDepartments() {
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

  public getCoursesByDeptId(deptId) {
    let apiAddress = "api/course/department/" + deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let courses = res as Course[];
        let tempCourses: Course[] = [];

        courses.forEach(course => {
          tempCourses.push(course);
        });

        if (this.id === 0) {
          this.courses[deptId - 2] = tempCourses;
        } else {
          this.courses[0] = tempCourses;
        }

        this.isLoaded = true;

        // console.log(this.courses);

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/coursecatalogue']);
  }


}
