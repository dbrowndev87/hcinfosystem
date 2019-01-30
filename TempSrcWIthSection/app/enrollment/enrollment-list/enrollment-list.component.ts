import { Component, OnInit } from '@angular/core';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Course } from 'src/app/_interfaces/course.model';
import { Department } from 'src/app/_interfaces/department.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { EnrollmentInfo } from 'src/app/_interfaces/enrollmentInfo.model';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})
export class EnrollmentListComponent implements OnInit {

  private studentInfo: StudentInfo[];
  private enrollments: Enrollment[];
  private enrollmentInfo: EnrollmentInfo[];
  public errorMessage: String = "";
  private isLoaded = false;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllenrollments();
    this.getAllStudentInfo();
    this.isLoaded = true;
  }

  public getAllenrollments() {
    let apiAddress = "api/";
    this.repository.getData(apiAddress)
      .subscribe(enrollments => {
        this.enrollments = enrollments as Enrollment[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  /**
   * This is the get all student info function which uses the
   * array of enrollements from up above and the students gathered
   * below to create Enrollement Info array which is a small
   * mix of both for the view.
   * 
   * Author: Darcy Brown
   * Date: January 30th, 2018
   */
  public getAllStudentInfo() {
    let apiAddress = "api/studentinfo";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentInfo = res as StudentInfo[];

        // Create enrollement info array for view.
        for (let x = 0; x < this.studentInfo.length; x++) {

          // Student ID for Check
          let Id = this.studentInfo[x].student_Id;

          // For each enrollement
          for (let y = 0; y < this.enrollments.length; y++) {

            // If the IDs match create an enrollement info
            // Interface and push it to the Array.
            if (this.enrollments[x].student_Id === Id) {

              let tempEnrollment: EnrollmentInfo = {
                student_Id: this.enrollments[x].student_Id,
                first_Name: this.studentInfo[x].first_Name,
                last_Name: this.studentInfo[x].last_Name,
                course_Status: this.enrollments[x].course_Status,
                grade: this.enrollments[x].grade,
                section_Id: this.enrollments[x].section_Id
              };

              this.enrollmentInfo.push(tempEnrollment);
            }
          }
        }

      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/enrollment/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}