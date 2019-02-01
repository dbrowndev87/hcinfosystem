import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentInfo } from '../_interfaces/studentInfo.model';
import { Enrollment } from '../_interfaces/enrollment.model';
import { Transaction } from '../_interfaces/transaction.model';
import { RepositoryService } from '../shared/services/repository.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { map } from 'rxjs/operators';
import { Department } from '../_interfaces/department.model';
import { Section } from '../_interfaces/section.model';
import { SectionInfo } from '../_interfaces/sectionInfo.model';
import { Course } from '../_interfaces/course.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  private typeCode: number;
  private previousUrl;
  private isLoaded = false;
  private errorMessage = "";

  // Student Related Variables
  private studentInfo: StudentInfo;
  private enrollments: Enrollment[] = [];
  private transactions: Transaction[] = [];
  private sections: SectionInfo[] = [];


  private department: Department;

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

    this.homeText = "Happy College Information System";
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    // If they are a student run the student laod function.
    if (this.typeCode === 3) {
      this.getStudentInfo();
    } else if (this.typeCode === 2) {

    } else {
      this.isLoaded = true;
    }

  }

  /*************************************************
   * STUDENT INFORMATION BEINGS HERE
   ************************************************/

  /************************
   * Get student Info
   ************************/
  public getStudentInfo() {
    let apiAddressStudentInfo = "api/studentinfo/" + sessionStorage.getItem("studentId");
    this.repository.getData(apiAddressStudentInfo).pipe(
      map(studentInfo => {

        // assign student info
        this.studentInfo = studentInfo as StudentInfo;
        // console.log(this.studentInfo);

        /************************************
         * Get Department/Program
         ***********************************/
        let apiAddressDepartments = "api/department/" + this.studentInfo.dept_Id;
        this.repository.getData(apiAddressDepartments).pipe(
          map(department => {

            // Get the depatment
            this.department = department as Department;
            // console.log(this.department);

            /************************************
            * Get Transactions
            ***********************************/
            let apiAddressTransactions = "api/transaction";
            this.repository.getData(apiAddressTransactions).pipe(
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
                this.repository.getData(apiAddressEnrollments).pipe(
                  map(enrollments => {
                    let tempEnroll = enrollments as Enrollment[];

                    // get Enrollments by Student ID
                    for (let x = 0; x < tempEnroll.length; x++) {
                      if (tempEnroll[x].student_Id === this.studentInfo.student_Id) {
                        this.enrollments.push(tempEnroll[x]);
                      }
                    }
                    // console.log(this.enrollments);

                    /************************************
                     * Get Sections
                     ***********************************/
                    let apiAddressSections = "api/section";
                    this.repository.getData(apiAddressSections).pipe(
                      map(sections => {
                        // Make an array to store the students sections in
                        let studentSections: Section[] = [];
                        let tempSections = sections as Section[];

                        // loop trough the enrollments compare them to the sections
                        // to get the students sections.
                        for (let x = 0; x < tempEnroll.length; x++) {
                          for (let y = 0; y < tempSections.length; y++) {
                            if (tempEnroll[x].section_Id === tempSections[y].section_Id) {
                              studentSections.push(tempSections[y]);
                            }
                          }
                        }
                        // console.log(studentSections);

                        /************************************
                         * Get Courses and make  Section Info
                         ***********************************/
                        let apiAddressCourses = "api/course";
                        this.repository.getData(apiAddressCourses).pipe(
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
                            console.log(this.sections);

                          })
                        ).subscribe(),
                          // get Enrollments error
                          // tslint:disable-next-line: no-unused-expression
                          (error) => {
                            this.errorHandler.handleError(error);
                            this.errorMessage = "Unable to access API";
                          };
                      })
                    ).subscribe(),
                      // get Enrollments error
                      // tslint:disable-next-line: no-unused-expression
                      (error) => {
                        this.errorHandler.handleError(error);
                        this.errorMessage = "Unable to access API";
                      };
                  })
                ).subscribe(),
                  // get Enrollments error
                  // tslint:disable-next-line: no-unused-expression
                  (error) => {
                    this.errorHandler.handleError(error);
                    this.errorMessage = "Unable to access API";
                  };

              })
            ).subscribe(),
              // get transaction error
              // tslint:disable-next-line: no-unused-expression
              (error) => {
                this.errorHandler.handleError(error);
                this.errorMessage = "Unable to access API";
              };
          })
        ).subscribe(),
          // get department error
          // tslint:disable-next-line: no-unused-expression
          (error) => {
            this.errorHandler.handleError(error);
            this.errorMessage = "Unable to access API";
          };
      })
    ).subscribe(),
      // get student info error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
}
