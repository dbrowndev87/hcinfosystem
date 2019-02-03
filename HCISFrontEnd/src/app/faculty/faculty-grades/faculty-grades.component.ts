import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TransactionIdGenerator } from 'src/app/shared/tools/tidg';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Student } from 'src/app/_interfaces/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { Section } from 'src/app/_interfaces/section.model';

@Component({
  selector: 'app-faculty-grades',
  templateUrl: './faculty-grades.component.html',
  styleUrls: ['./faculty-grades.component.css']
})
export class FacultyGradesComponent implements OnInit {

  public errorMessage = '';
  public studentInfo: StudentInfo;
  public student: Student;
  public section_Id: number;
  public students: StudentInfo [];
  public sections: Section [];
  public studentGradesForm: FormGroup;
  private transId: number;
  private isLoaded = false;
  private studentId: number;
  private studentEnrollment: Enrollment;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private tidg: TransactionIdGenerator
  ) { }

  ngOnInit() {

    this.studentGradesForm = new FormGroup({
      grade: new FormControl('', [Validators.required, Validators.minLength(1)]),
      course_Status: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    // This is gets the students information and student
    // table object.

    this.getAllStudents();
    this.getAllSections();
    this.isLoaded = true;
  }


  private getAllSections() {
    let apiAddress = "api/section/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        // get student table info
        this.sections = res as Section[];

        // get the full student Information with the id
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
        }));
  }

  private getAllStudents() {
    let apiAddress = "api/studentInfo/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(students => {

        // get student table info
        this.students = students as StudentInfo [];

        // get the full student Information with the id
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
        }));
  }

  private getEnrollmentInfo(studentId, sectionId) {


    let apiAddress = "api/enrollment/section/student/" + studentId + " /" + sectionId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(enrollment => {

        // get student table info
        this.studentEnrollment = enrollment as Enrollment;
        this.studentGradesForm.patchValue(this.studentEnrollment);

        // get the full student Information with the id
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
        }));
  }
  public validateControl(controlName: string) {
    if (this.studentGradesForm.controls[controlName].invalid && this.studentGradesForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

}
