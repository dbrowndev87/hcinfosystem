import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportIdGenerator } from 'src/app/shared/tools/ridg';
import { Department } from 'src/app/_interfaces/department.model';
import { Course } from 'src/app/_interfaces/course.model';
import { Section } from 'src/app/_interfaces/section.model';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';

@Component({
  selector: 'app-faculty-courses-report',
  templateUrl: './faculty-courses-report.component.html',
  styleUrls: ['./faculty-courses-report.component.css']
})
export class FacultyCoursesReportComponent implements OnInit {

  public errorMessage: String = "";

  private user: User;
  private id: number;
  private isLoaded = false;
  private semesters = new Semesters();
  private counter = 0;
  private theDepartment: Department;
  private facultyByDepartment: FacultyInfo[] = [];


  private reportId = "";
  private reportDate;
  private reportFor = "";

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];
  sectionsByFaculty: Section[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private reportIDGen: ReportIdGenerator
  ) { }

  ngOnInit() {

    this.getUser();

    this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
    this.reportDate = this.semesters.getTodaysDate();
    this.reportId = this.reportIDGen.generateId('CC');
  }

  public getSections() {
    console.log(this.facultyByDepartment);

  }
  private getDepartment() {
    let apiAddress = "api/department/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {

        if (this.id === 0) {

        } else {
          this.theDepartment = res as Department;
          console.log(this.theDepartment.dept_Name);

        }
        // console.log(this.depts);
        // this.getFacultyByDeptId(this.id);

      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }).add(() => {
          this.getFacultyByDeptId(this.theDepartment.dept_Id);


        }));
  }

  private getUser() {
    let apiAddress = "api/user/" + sessionStorage.getItem('userId');
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {
        this.user = res as User;
      }).add(() => {
        this.getDepartment();
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public getFacultyByDeptId(deptId) {

    console.log(deptId);
    let apiAddress = "api/facultyinfo/department/" + deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {

        this.facultyByDepartment = res as FacultyInfo[];
        console.log(this.facultyByDepartment);
        for (let i = 0; i < this.facultyByDepartment.length; i++) {
          this.getSectionsByFacultyId(this.facultyByDepartment[i], i);
        }
        if (this.facultyByDepartment.length === 0) {
          this.isLoaded = true;
        }
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };


  }

  public getSectionsByFacultyId(faculty, index) {
    let i = index;
    let apiAddress = "api/section/faculty/" + faculty.faculty_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.sectionsByFaculty = res as Section[];
        this.facultyByDepartment[index]['sections'] = this.sectionsByFaculty;
        console.log(this.facultyByDepartment[index]['sections']);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }).add(() => {
          if (i === this.facultyByDepartment.length - 1) {
            this.isLoaded = true;
          }
        }));

  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/facultycourses']);
  }

}
