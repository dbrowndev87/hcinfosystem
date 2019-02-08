import { Component, OnInit } from '@angular/core';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Student } from 'src/app/_interfaces/student.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';

@Component({
  selector: 'app-student-courses-report',
  templateUrl: './student-courses-report.component.html',
  styleUrls: ['./student-courses-report.component.css']
})
export class StudentCoursesReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  private studentInfos: StudentInfo[] = [];
  private enrollments: Enrollment[] = [];
  private student: Student;
  private id: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();
  private students: any[] = [];

  private counter = 0;
  private transcriptDate;
  private semester: any;
  private year: any;
  private dept: number;


  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    if (this.typeCode !== 1) {
      this.router.navigate(['/404']);
    } else {
      // else load their transcript.
      this.transcriptDate = this.semesters.getTodaysDate();
      this.id = parseInt(sessionStorage.getItem('id'), 0);
      this.semester = this.activeatedRoute.snapshot.params['semester'];
      this.year = parseInt(this.activeatedRoute.snapshot.params['year']);
      this.dept = this.activeatedRoute.snapshot.params['deptId'];


      this.getStudentsBySemesterYear();

    }
  }

  private getEnrollmentsBySectionId(id) {
    let apiAddress = "api/enrollment/section/" + id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let enrollments = res as Enrollment[];

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

  private getStudentsBySemesterYear() {
    let apiAddress = "api/section/semester/year/" + this.semester + "/" + this.year;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentInfos = res as StudentInfo[];

        console.log(this.studentInfos);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {

          this.isLoaded = true;

        }));
  }

  private getAllStudents() {

    let apiAddress = "api/studentInfo/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.students = res as StudentInfo[];

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/studentcourses']);
  }

  private backToStudentHome() {
    this.router.navigate(['/student/home']);
  }
}
