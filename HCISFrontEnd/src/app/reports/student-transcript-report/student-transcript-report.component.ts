import { Component, OnInit } from '@angular/core';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/_interfaces/student.model';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';

@Component({
  selector: 'app-student-transcript-report',
  templateUrl: './student-transcript-report.component.html',
  styleUrls: ['./student-transcript-report.component.css']
})
export class StudentTranscriptReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  private sectionInfo: SectionInfo[];
  private student: Student;
  private id: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();

  private counter = 0;
  private transcriptDate;


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

    // if a student is logged in and tries to access anything other
    // than their own transcript, send them to 404.
    if (this.typeCode === 3 && sessionStorage.getItem('studentId')) {
      let urlParam = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
      let studentId = parseInt(sessionStorage.getItem('studentId'), 0);

      if (urlParam !== studentId) {
        this.router.navigate(['/404']);
      } else {
        // else load their transcript.
        this.transcriptDate = this.semesters.getTodaysDate();
        this.id = parseInt(sessionStorage.getItem('studentId'), 0);
        this.getStudent();
      }
    } else {
      // Admin load transcripts.
      this.transcriptDate = this.semesters.getTodaysDate();
      this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
      this.getStudent();
    }
  }


  private getStudent() {
    let apiAddress = "api/studentInfo/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.student = res as Student;
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          // get the students sections
          this.getSectionsByStudentId();
        }));
  }

  private getSectionsByStudentId() {
    let apiAddress = "api/enrollment/student/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.sectionInfo = res as SectionInfo[];
        console.log(this.sectionInfo);

        let array: any[] = [];

        this.sectionInfo.forEach(sections => {

        });
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          this.isLoaded = true;
        }));
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/studenttranscript']);
  }

  private backToStudentHome() {
    this.router.navigate(['/student/home']);
  }
}
