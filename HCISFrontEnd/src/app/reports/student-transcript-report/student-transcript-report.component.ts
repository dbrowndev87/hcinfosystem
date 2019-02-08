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
  private sectionInfo: any[] = [];
  private enrollments: Enrollment[];
  private student: Student;
  private id: number;
  private gpa: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();
  private orderBy = new OrderBy();

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
        let tempSectionInfo: any[] = [];

        // Order By End Date
        this.orderBy.transform(sectionInfo, 'end_Date');
        tempSectionInfo = sectionInfo;

        this.getEnrollments(tempSectionInfo);

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
  private getEnrollments(sectionInfo: SectionInfo[]) {
    let apiAddress = "api/enrollment";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let enrollments = res as Enrollment[];

        // create variables to store numbers
        let enrollmentCount: number = 0;
        let acumulativeGrade: number = 0;

        // check the section info objects against the enrollment objects
        for (let x = 0; x < sectionInfo.length; x++) {
          for (let y = 0; y < enrollments.length; y++) {

            // if these credentials match
            if (sectionInfo[x].section_Id === enrollments[y].section_Id &&
              enrollments[y].student_Id === this.id &&
              enrollments[y].course_Status === "Completed") {

              // store them ad the X index as 'section' and 'grade' fro the section
              this.sectionInfo[x] = { 'section': sectionInfo[x], 'grade': enrollments[y].grade };
              enrollmentCount++;
              acumulativeGrade += enrollments[y].grade;
            }
          }
        }

        // calculate the gpa
        this.gpa = (acumulativeGrade / enrollmentCount);

        // console.log(this.sectionInfo);
        // console.log("GPA: " + this.gpa);
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
