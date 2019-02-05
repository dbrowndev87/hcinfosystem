import { Component, OnInit } from '@angular/core';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { map } from 'rxjs/operators';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { Section } from 'src/app/_interfaces/section.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Transaction } from 'src/app/_interfaces/transaction.model';
import { Course } from 'src/app/_interfaces/course.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {



  public homeText: string;
  private typeCode: number;
  private isLoaded = false;
  private errorMessage = "";
  private enrollmentCount = 0;
  private successHeader;
  private successMessage;

  // Student Related Variables
  private studentInfo: StudentInfo;
  private enrollments: Enrollment[] = [];
  private sectionToDrop: SectionInfo;
  private sectionsById: Section[] = [];
  private transactions: Transaction[] = [];
  private sections: SectionInfo[] = [];
  private department: Department;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {

    // If the usertype is not any of the type codes go to 404
    if (!sessionStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }

    this.getStudentInfo();
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
  }


  /*************************************************
   * STUDENT INFORMATION BEINGS HERE
   ************************************************/

  // This triggers the confirmation dialog
  private studentConfirm(section: SectionInfo) {
    this.sectionToDrop = section;
    $('#confirmModal').modal();
  }


  // if they pick yes on the dialog
  private studentDropCourse(sectionToDrop: SectionInfo) {

    let apiAddressEnrollments = "api/enrollment/section/" + sectionToDrop.section_Id;
    this.subscriptions.push(this.repository.getData(apiAddressEnrollments).pipe(
      map(studentEnrollments => {

        let tempEnrollments = studentEnrollments as Enrollment[];
        let enrollmentToDrop: Enrollment;

        // get the enrollment object
        tempEnrollments.forEach(temp => {
          if (temp.student_Id === this.studentInfo.student_Id) {
            enrollmentToDrop = temp;
          }
        });

        // set the enrollment to dropped
        enrollmentToDrop.course_Status = "Dropped";

        // Update the enrollment to dropped
        let apiUrlEnrollment = `api/enrollment/` + enrollmentToDrop.enrollment_Id;
        this.subscriptions.push(this.repository.update(apiUrlEnrollment, enrollmentToDrop)
          .subscribe(res => { },
            (error => {
              this.errorHandler.handleError(error);
              this.errorMessage = "Unable to access API";
            })
          ));

        // Update the display array
        let index = 0;
        this.sections.forEach(temp => {
          if (temp.section_Id === enrollmentToDrop.section_Id) {
            this.sections.splice(index, 1);
          }
          index++;
        });

        // Update the enrollment to dropped
        let apiUrlSection = `api/section/` + this.sectionToDrop.section_Id;

        // set the section object and add the vacancy back
        let tempSection: Section = {
          course_Id: sectionToDrop.course_Id,
          designation: sectionToDrop.designation,
          end_Date: sectionToDrop.end_Date,
          faculty_Id: sectionToDrop.faculty_Id,
          section_Id: sectionToDrop.section_Id,
          semester: sectionToDrop.semester,
          start_Date: sectionToDrop.start_Date,
          vacancy: (sectionToDrop.vacancy + 1)
        };

        // Update the section object
        this.subscriptions.push(this.repository.update(apiUrlSection, tempSection)
          .subscribe(res => { },
            (error => {
              this.errorHandler.handleError(error);
              this.errorMessage = "Unable to access API";
            })
          ));

        // Update the view.
        this.enrollmentCount--;

        // Success message and modal.
        this.successHeader = "Drop Course";
        this.successMessage = "Course dropped Successfuly";
        $('#successModal').modal();
      })
    ).subscribe()),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };

  }


  /************************
   * Get student Info
   ************************/
  public getStudentInfo() {
    let apiAddressStudentInfo = "api/studentinfo/" + sessionStorage.getItem("studentId");
    this.subscriptions.push(this.repository.getData(apiAddressStudentInfo).pipe(
      map(studentInfo => {

        // assign student info
        this.studentInfo = studentInfo as StudentInfo;
        // console.log(this.studentInfo);

        /************************************
         * Get Department/Program
         ***********************************/
        let apiAddressDepartments = "api/department/" + this.studentInfo.dept_Id;
        this.subscriptions.push(this.repository.getData(apiAddressDepartments).pipe(
          map(department => {

            // Get the depatment
            this.department = department as Department;
            // console.log(this.department);

            /************************************
            * Get Transactions
            ***********************************/
            let apiAddressTransactions = "api/transaction";
            this.subscriptions.push(this.repository.getData(apiAddressTransactions).pipe(
              map(transactions => {
                // Get the transactions
                let tempTrans = transactions as Transaction[];

                // get students transactions by id
                for (let x = 0; x < tempTrans.length; x++) {
                  if (tempTrans[x].student_Id === this.studentInfo.student_Id) {
                    this.transactions.push(tempTrans[x]);
                  }
                }

                /************************************
                * Get Enrollments
                ***********************************/
                let apiAddressEnrollments = "api/enrollment";
                this.subscriptions.push(this.repository.getData(apiAddressEnrollments).pipe(
                  map(enrollments => {
                    let tempEnroll = enrollments as Enrollment[];

                    // get Enrollments by Student ID
                    for (let x = 0; x < tempEnroll.length; x++) {
                      if (tempEnroll[x].student_Id === this.studentInfo.student_Id) {
                        if (tempEnroll[x].course_Status !== "Dropped") {
                          this.enrollments.push(tempEnroll[x]);
                          this.enrollmentCount++;
                        }
                      }
                    }
                    // console.log(this.enrollments);

                    /************************************
                     * Get Sections
                     ***********************************/
                    let apiAddressSections = "api/section";
                    this.subscriptions.push(this.repository.getData(apiAddressSections).pipe(
                      map(sections => {
                        // Make an array to store the students sections in
                        let studentSections: Section[] = [];
                        let tempSections = sections as Section[];

                        // loop trough the enrollments compare them to the sections
                        // to get the students sections.
                        for (let x = 0; x < this.enrollments.length; x++) {
                          for (let y = 0; y < tempSections.length; y++) {
                            if (this.enrollments[x].section_Id === tempSections[y].section_Id) {
                              studentSections.push(tempSections[y]);
                            }
                          }
                        }
                        // console.log(studentSections);

                        /************************************
                         * Get Courses and make  Section Info
                         ***********************************/
                        let apiAddressCourses = "api/course";
                        this.subscriptions.push(this.repository.getData(apiAddressCourses).pipe(
                          map(courses => {
                            let tempCourses = courses as Course[];

                            for (let x = 0; x < studentSections.length; x++) {
                              for (let y = 0; y < tempCourses.length; y++) {
                                if (studentSections[x].course_Id === tempCourses[y].course_Id) {

                                  // Create a Section Info object
                                  let tempSectionInfo: SectionInfo = {
                                    course_Id: tempCourses[y].course_Id,
                                    course_Name: tempCourses[y].course_Name,
                                    credits: tempCourses[y].credits,
                                    dept_Id: tempCourses[y].dept_Id,
                                    designation: studentSections[x].designation,
                                    end_Date: studentSections[x].end_Date,
                                    faculty_Id: studentSections[x].faculty_Id,
                                    section_Id: studentSections[x].section_Id,
                                    semester: studentSections[x].semester,
                                    start_Date: studentSections[x].start_Date,
                                    vacancy: studentSections[x].vacancy
                                  };
                                  // push to array
                                  this.sections.push(tempSectionInfo);
                                }
                              }
                            }

                            this.isLoaded = true;
                            // console.log(this.sections);

                          })
                        ).subscribe()),
                          // get Enrollments error
                          // tslint:disable-next-line: no-unused-expression
                          (error) => {
                            this.errorHandler.handleError(error);
                            this.errorMessage = "Unable to access API";
                          };
                      })
                    ).subscribe()),
                      // get Enrollments error
                      // tslint:disable-next-line: no-unused-expression
                      (error) => {
                        this.errorHandler.handleError(error);
                        this.errorMessage = "Unable to access API";
                      };
                  })
                ).subscribe()),
                  // get Enrollments error
                  // tslint:disable-next-line: no-unused-expression
                  (error) => {
                    this.errorHandler.handleError(error);
                    this.errorMessage = "Unable to access API";
                  };

              })
            ).subscribe()),
              // get transaction error
              // tslint:disable-next-line: no-unused-expression
              (error) => {
                this.errorHandler.handleError(error);
                this.errorMessage = "Unable to access API";
              };
          })
        ).subscribe()),
          // get department error
          // tslint:disable-next-line: no-unused-expression
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = "Unable to access API";
          };
      })
    ).subscribe()),
      // get student info error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
}

