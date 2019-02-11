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
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';

@Component({
  selector: 'app-faculty-courses-report',
  templateUrl: './faculty-courses-report.component.html',
  styleUrls: ['./faculty-courses-report.component.css']
})

export class FacultyCoursesReportComponent implements OnInit {

  public errorMessage: String = "";
  public depts: any[] = new Array();
  public faculty: any[] = [];

  public user: User;
  public id: string;
  public isLoaded = false;
  public semesters = new Semesters();
  public counter = 0;
  public theDepartment: Department;
  public facultyByDepartment: FacultyInfo[] = [];

  public reportId = "";
  public reportDate;
  public reportFor = "";

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];
  sectionsByFaculty: Section[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public activeatedRoute: ActivatedRoute,
    public reportIDGen: ReportIdGenerator
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

  public getAllDepartments() {
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
  public getFaculty(depts: any[]) {

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

    let apiAddress = "api/section/courseInfo/faculty/" + facultyId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let sections: SectionInfo[] = res as SectionInfo[];
        let tempArray: any[] = new Array();

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


  public backToReportGenerator() {
    this.router.navigate(['/reports/facultycourses']);
  }

}
