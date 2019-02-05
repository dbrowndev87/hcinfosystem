import { Component, OnInit } from '@angular/core';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Section } from 'src/app/_interfaces/section.model';
import { Transaction } from 'src/app/_interfaces/transaction.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { map } from 'rxjs/operators';
import { EnrollmentListComponent } from 'src/app/enrollment/enrollment-list/enrollment-list.component';

@Component({
  selector: 'app-faculty-home',
  templateUrl: './faculty-home.component.html',
  styleUrls: ['./faculty-home.component.css']
})
export class FacultyHomeComponent implements OnInit {


  public homeText: string;
  private typeCode: number;
  private sectionIdForGrades: number;
  private previousUrl;
  private isLoaded = false;
  private errorMessage = "";
  private successHeader;
  private successMessage;

  private studentEnrollment: Enrollment;
  private studentInfo: StudentInfo;
  private facultyInfo: FacultyInfo;
  private enrollments: Enrollment[] = [];
  private sectionsById: Section[] = [];
  private sections: SectionInfo[] = [];
  private students: StudentInfo[] = [];
  private faculty: FacultyInfo[] = [];
  private enrollmentGrades: number[] = [];
  private department: Department;
  public buttonClicked = false;

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

    this.homeText = "Happy College Information System";
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);


    this.getFacultyInfo();

  }

  /************************
   * Get faculty Info
   ************************/

  public getFacultyInfo() {

    let apiAddressFaculty = "api/facultyinfo/" + sessionStorage.getItem("facultyId");
    this.subscriptions.push(this.repository.getData(apiAddressFaculty).pipe(
      map(facultyInfo => {
        this.facultyInfo = facultyInfo as FacultyInfo;

        this.getDepartmentById(this.facultyInfo.dept_Id);
        this.getSectionsById(sessionStorage.getItem("facultyId"));

      })
    ).subscribe()),
      // get Enrollments error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public getCourseRoster(sectionId) {
    this.sectionIdForGrades = sectionId;
    let apiAddressInfo = "api/studentInfo/section/" + sectionId;
    this.subscriptions.push(this.repository.getData(apiAddressInfo).pipe(
      map((studentInfoLoop: StudentInfo[]) => {

        this.students = studentInfoLoop as StudentInfo[];
        for (let index = 0; index < studentInfoLoop.length; index++) {

          let apiAddress = "api/enrollment/section/student/" + this.students[index].student_Id + " /" + this.sectionIdForGrades;
          this.subscriptions.push(this.repository.getData(apiAddress)
            .subscribe((enrollment: Enrollment) => {

              this.enrollmentGrades[index] = enrollment.grade;

            },
              (error) => {
                this.errorHandler.handleError(error);
                this.errorMessage = "Unable to access API";
                this.isLoaded = true;
              }));
        }
      })
    ).subscribe()),
      // get Roster error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  private getEnrollmentInfo() {


  }


  public UpdateGrades(studentId) {
    console.log(studentId);
    console.log(this.sectionIdForGrades);
    this.router.navigate(['/faculty/grades/' + studentId + "/" + this.sectionIdForGrades]);
  }

  public getDepartmentById(id) {
    let apiAddressDepartments = "api/department/" + id;
    this.subscriptions.push(this.repository.getData(apiAddressDepartments).pipe(
      map(department => {

        // Get the depatment
        this.department = department as Department;
        this.isLoaded = true;


      })
    ).subscribe()),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public getSectionsById(id) {
    let apiAddressSections = "api/section/faculty/" + id;
    this.subscriptions.push(this.repository.getData(apiAddressSections).pipe(
      map(sectionsFromDb => {

        // Get the depatment
        this.sectionsById = sectionsFromDb as Section[];

      })
    ).subscribe()),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }


}
