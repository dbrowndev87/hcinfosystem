import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportIdGenerator } from 'src/app/shared/tools/ridg';
import { Department } from 'src/app/_interfaces/department.model';
import { Section } from 'src/app/_interfaces/section.model';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';
import { Faculty } from 'src/app/_interfaces/faculty.model';

@Component({
  selector: 'app-faculty-courses-report',
  templateUrl: './faculty-courses-report.component.html',
  styleUrls: ['./faculty-courses-report.component.css']
})

export class FacultyCoursesReportComponent implements OnInit {

  public errorMessage: String = "";
  private depts: any[] = new Array();
  private faculty: any[] = [];

  private user: User;
  private id: string;
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
    this.id = this.activeatedRoute.snapshot.params['id'];

    this.reportDate = this.semesters.getTodaysDate();
    this.reportId = this.reportIDGen.generateId('FC');

    if (this.id === '0') {
      this.getAllDepartments();
    } else {
      this.getDepartmentById();
    }
  }
  public getDepartmentById() {

    let apiAddress = "api/department/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts[0] = res as Department;
        // console.log(this.courses);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }).add(() => {
          // Pass the depts on to get the faculty.
          this.getFaculty(this.depts);
        }));
  }

  private getAllDepartments() {
    let apiAddress = "api/department";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        let depts = res as Department[];
        let faculty: any[] = new Array();
        let counter = 0;

        depts.forEach(dept => {
          let tempArray: any[] = new Array();
          tempArray.push(dept);
          this.depts.push(tempArray);
        });

        // console.log(this.courses);

        // Pass the courses on to get the sections.
        this.getFaculty(depts);
        this.depts = depts;

      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }));
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
  private getFaculty(depts: any[]) {

    let apiAddress = "api/facultyInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        let faculty: FacultyInfo[] = [];
        let tempFaculty: any[] = [];
        faculty = res as FacultyInfo[];

        /**
         * For each of the courses create a temporary array push the sections
         * that belong to that course to the 1 index of the index of that
         * course in the courses array
         */


        for (let x = 0; x < depts.length; x++) {
          let tempArray: any[] = [];
          depts[x]['faculty'] = tempArray;

          for (let y = 0; y < faculty.length; y++) {
            if (depts[x].dept_Id === faculty[y].dept_Id) {
              depts[x]['faculty'].push(faculty[y]);
            }
          }

        }


        // console.log(courses);

        // this.faculty = tempFaculty;
        // console.log(this.sections);

        // If you turn up no results for faculty just call isLoaded here
        if (this.depts.length <= 1 || this.faculty[0].length === 0) {
          this.isLoaded = true;
        }


      }).add(() => {

        for (let x = 0; x < this.depts.length; x++) {
          for (let y = 0; y < this.depts[x]['faculty'].length; y++) {
            let tempArray: any[] = [];
            this.depts[x]['faculty'][y]['sections'] = tempArray;

            if (this.depts[x]['faculty'].length > 0) {
              this.getSectionInfoByFacultyId(this.depts[x]['faculty'][y].faculty_Id, x, y);
            }
          }
        }


      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public getSectionInfoByFacultyId(facultyId, x, y) {

    let apiAddress = "api/section/faculty/" + facultyId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let sections: Section[] = res as Section[];
        let tempArray: any[] = new Array();
        console.log("Sections: " + sections + " By FacultyID: " + facultyId);

        for (let z = 0; z < sections.length; z++) {
          this.depts[x]['faculty'][y]['sections'].push(sections[z]);
        }

      }).add(() => {
        this.counter++;

        if (this.counter = this.depts.length) {
          this.isLoaded = true;
        }
      })),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  private backToReportGenerator() {
    this.router.navigate(['/reports/facultycourses']);
  }

}
