/**
 * Name: Enrollement List Component
 * Description: This is the Enrollement List component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 30th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { EnrollmentInfo } from 'src/app/_interfaces/enrollmentInfo.model';
import { map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-enrollment-list',
  templateUrl: './enrollment-list.component.html',
  styleUrls: ['./enrollment-list.component.css']
})

export class EnrollmentListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<EnrollmentInfo> = new Subject();

  private studentInfo: StudentInfo[];
  private enrollments: Enrollment[];
  private enrollmentInfo: EnrollmentInfo[] = [];
  public errorMessage: String = "";
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllenrollments();
    // Set the data is loaded flag.
    this.isLoaded = true;
  }


  /**
   * This is a method which kills two birds with one stone. I tried using
   * map here to accomplish both tasks at the same time and built an enrollement
   * info object for each enrollement, using the students name as well for easier search
   * in the view.
   * 
   * Author: Darcy Brown
   * Date: January 30th, 2019
   */
  public getAllenrollments() {

    let apiAddress = "api/enrollment";
    this.subscriptions.push(this.repository.getData(apiAddress).pipe(
      map(enrollments => {
        // Assign the enrollements
        this.enrollments = enrollments as Enrollment[];

        // Get the student info
        let apiAddressStudents = "api/studentinfo";
        this.subscriptions.push(this.repository.getData(apiAddressStudents).pipe(
          map(studentinfo => {

            // assign the student info
            this.studentInfo = studentinfo as StudentInfo[];

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
                    section_Id: this.enrollments[x].section_Id,
                    enrollment_Id: this.enrollments[x].enrollment_Id
                  };

                  // Push the Enrollment Info item to the array
                  this.enrollmentInfo.push(tempEnrollment);
                  this.dtTrigger.next();
                }
              }
            }
          })
        ).subscribe(e => { },
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = "Unable to access API";
            this.isLoaded = true;
          }));
      })
    ).subscribe(e => { },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
        this.isLoaded = true;
      }));
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  public redirectToUpdatePage(id) {
    let updateUrl = `/enrollment/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}