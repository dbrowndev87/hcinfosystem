import { SectionInfo } from './../../_interfaces/sectionInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Student } from 'src/app/_interfaces/student.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-student-courses-report',
  templateUrl: './student-courses-report.component.html',
  styleUrls: ['./student-courses-report.component.css']
})
export class StudentCoursesReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  public studentInfos: StudentInfo[] = [];
  public enrollmentsByStudentId: Enrollment[] = [];
  public student: Student;
  public id: number;
  public isLoaded = false;
  public typeCode;
  public semesters = new Semesters();
  public students: any[] = [];
  public department: Department;
  public allSections: SectionInfo[] = [];

  public counter = 0;
  public transcriptDate;
  public semester: any;
  public year: any;
  public dept: number;


  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];
  loggedInUser: any;


  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public activeatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    if (this.typeCode !== 1) {
      this.router.navigate(['/404']);
    } else {
      // else load their transcript.
      this.transcriptDate = this.semesters.getTodaysDate();
      this.id = parseInt(sessionStorage.getItem('userId'), 0);
      this.getUserInformation(this.id);
      this.semester = this.activeatedRoute.snapshot.params['semester'];
      this.year = parseInt(this.activeatedRoute.snapshot.params['year'], 0);
      // tslint:disable-next-line:radix
      this.dept = parseInt(this.activeatedRoute.snapshot.params['deptId']);


      this.getAllSections();

    }
  }
  public getUserInformation(id) {
    let apiAddress = "api/user/" + id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.loggedInUser = res as User;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
  public getDepartmentById(deptId) {
    let apiAddress = "api/department/" + deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.department = res as Department;

        this.getStudentsBySemesterYear();
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
  public getAllSections() {
    let apiAddress = "api/section/courseInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.allSections = res as SectionInfo[];

        this.getDepartmentById(this.dept);
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public getEnrollmentsByStudentId(id, i) {
    let apiAddress = "api/section/semester/year/student/dept/" + this.semester + "/" + this.year + "/" + id + "/" + this.department.dept_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        let enrollmentsByStudentId = res as Enrollment[];
        let tempSections: SectionInfo[] = [];
        this.studentInfos[i]['enrollments'] = [];
        this.studentInfos[i]['sections'] = [];


        for (let j = 0; j < enrollmentsByStudentId.length; j++) {
          this.studentInfos[i]['enrollments'].push(enrollmentsByStudentId[j]);
          for (let x = 0; x < this.allSections.length; x++) {
            if (enrollmentsByStudentId[j].section_Id == this.allSections[x].section_Id) {
              this.studentInfos[i]['sections'].push(this.allSections[x]);
            }
          }
        }


      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          // get the students sections
          // this.getSectionsBySemesterYear();
        }));
  }

  public getStudentsBySemesterYear() {
    console.log(this.semester + this.year);
    let apiAddress = "api/section/semester/year/dept/" + this.semester + "/" + this.year + "/" + this.department.dept_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        this.studentInfos = res as StudentInfo[];
        console.log(this.studentInfos);

        for (let i = 0; i < this.studentInfos.length; i++) {
          this.getEnrollmentsByStudentId(this.studentInfos[i].student_Id, i);
          this.counter++;
        }
        this.isLoaded = false;
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          console.log(this.studentInfos);
          if (this.counter == this.studentInfos.length) {
            this.isLoaded = true;
          }

        }));
  }

  public backToReportGenerator() {
    this.router.navigate(['/reports/studentcourses']);
  }
}
