/**
 * Name: Student Transcript Report Component
 * Description: this is the student transcript report which takes
 * the students courses by end date and gives you the grades and
 * total GPA
 * 
 * Author: Darcy Brown
 * Date: Febuary 8th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/_interfaces/student.model';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { OrderBy } from '../../shared/tools/orderBy';

@Component({
  selector: 'app-student-transcript-report',
  templateUrl: './student-transcript-report.component.html',
  styleUrls: ['./student-transcript-report.component.css']
})

export class StudentTranscriptReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  private sectionInfo: any;
  private tempStorage: any[] = [];
  private enrollments: Enrollment[];
  private student: Student;
  private id: number;
  private gpa: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();
  private orderBy = new OrderBy();

  private byYear = false;
  private type = "";
  private semester = "";
  private year = "";



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

    this.sectionInfo = {
      'spring': { 'sections': [] = <any>Array(), 'pass': 0, 'fail': 0, 'credits': 0, 'sumgrades': 0 },
      'summer': { 'sections': [] = <any>Array(), 'pass': 0, 'fail': 0, 'credits': 0, 'sumgrades': 0 },
      'fall': { 'sections': [] = <any>Array(), 'pass': 0, 'fail': 0, 'credits': 0, 'sumgrades': 0 }
    };

    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    // if a student is logged in and tries to access anything other
    // than their own transcript, send them to 404.
    if (this.typeCode === 3 && sessionStorage.getItem('studentId')) {
      let urlParam = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
      let urlType = this.activeatedRoute.snapshot.params['v'];
      let studentId = parseInt(sessionStorage.getItem('studentId'), 0);

      if (urlParam !== studentId) {
        this.router.navigate(['/404']);
      } else {
        // else load their transcript.
        this.transcriptDate = this.semesters.getTodaysDate();
        this.id = parseInt(sessionStorage.getItem('studentId'), 0);

        if (urlType === "Summer" || urlType === "Spring" || urlType === "Fall") {

          this.type = "Semester";
          this.semester = urlType;

        } else {

          this.byYear = true;
          this.type = "Year";
          this.year = urlType;

        }

        this.getStudent();
      }
    } else {
      // Admin load transcripts.
      this.transcriptDate = this.semesters.getTodaysDate();
      let urlType = this.activeatedRoute.snapshot.params['v'];
      this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);

      if (urlType === "Summer" || urlType === "Spring" || urlType === "Fall") {

        this.type = "Semester";
        this.semester = urlType;

      } else {

        this.byYear = true;
        this.type = "Year";
        this.year = urlType;
      }

      this.getStudent();
    }
  }


  /**
   * Get the Students Information
   */
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

  /**
   * Gets all the sections that the student is enrolled in.
   */
  private getSectionsByStudentId() {
    let apiAddress = "api/enrollment/student/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let sectionInfo = res as SectionInfo[];
        this.orderBy.transform(sectionInfo, 'end_Date');

        if (this.type === "Year") {

          for (let x = 0; x < sectionInfo.length; x++) {

            if (sectionInfo[x].start_Date.toString().slice(0, 4) === this.year) {

              if (sectionInfo[x].semester === "Spring") {
                this.getEnrollments(sectionInfo[x], 'spring', x);
              } else if (sectionInfo[x].semester === "Summer") {
                this.getEnrollments(sectionInfo[x], 'summer', x);
              } else if (sectionInfo[x].semester === "Fall") {
                this.getEnrollments(sectionInfo[x], 'fall', x);
              }

            } else {
              this.isLoaded = true;
            }
          }
        } else if (this.type === "Semester") {

          for (let x = 0; x < sectionInfo.length; x++) {

            if (sectionInfo[x].semester === this.semester) {

              if (sectionInfo[x].semester === "Spring") {
                this.getEnrollments(sectionInfo[x], 'spring', x);
              } else if (sectionInfo[x].semester === "Summer") {
                this.getEnrollments(sectionInfo[x], 'summer', x);
              } else if (sectionInfo[x].semester === "Fall") {
                this.getEnrollments(sectionInfo[x], 'fall', x);
              }

            } else {
              this.isLoaded = true;
            }
          }

        }

      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }));
  }

  /**
   * Get the enrollment information to compare against each
   * section info object.
   * @param sectionInfo
   */
  private getEnrollments(sectionInfo: SectionInfo, semester: string, index: number) {
    let apiAddress = "api/enrollment";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let enrollments = res as Enrollment[];

        // create variables to store numbers
        let enrollmentCount: number = 0;
        let acumulativeGrade: number = 0;


        // check the section info objects against the enrollment objects

        for (let y = 0; y < enrollments.length; y++) {

          // if these credentials match
          if (sectionInfo.section_Id === enrollments[y].section_Id &&
            enrollments[y].student_Id === this.id &&
            enrollments[y].course_Status === "Completed") {

            // Passing additions
            if (enrollments[y].grade >= 60) {
              this.sectionInfo[semester]['pass'] += 1;
              this.sectionInfo[semester]['credits'] += sectionInfo.credits;

              // Failing additions
            } else if (enrollments[y].grade < 60) {
              this.sectionInfo[semester]['fail'] += 1;
            }

            // Push the sectiona nd the grade
            this.sectionInfo[semester]['sections'].push({ 'info': sectionInfo, 'grade': enrollments[y].grade });
            this.sectionInfo[semester]['sumgrades'] += enrollments[y].grade;
          }
        }
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          this.isLoaded = true;
        }));
  }


  /**
   * Back button functions.
   */
  private backToReportGenerator() {
    this.router.navigate(['/reports/studenttranscript']);
  }

  private backToStudentHome() {
    this.router.navigate(['/student/home']);
  }


}
