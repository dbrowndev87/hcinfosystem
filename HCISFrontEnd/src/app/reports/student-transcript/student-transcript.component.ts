/**
 * Name: Student Transcript  Component
 * Description: This is the component that allows you to choose
 * which student you would like to generate the transacript for
 * 
 * Author: Darcy Brown
 * Date: Febuary 8th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Section } from 'src/app/_interfaces/section.model';

@Component({
  selector: 'app-student-transcript',
  templateUrl: './student-transcript.component.html',
  styleUrls: ['./student-transcript.component.css']
})
export class StudentTranscriptComponent implements OnInit {

  public studentInfo: StudentInfo[];
  public errorMessage: String = "";
  private studentTranscriptForm: FormGroup;
  private depts: Department[];
  private id: number;
  private isLoaded = false;
  private years: any[] = [];
  private typeCode;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  private bySemester = false;
  private byYear = true;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,

  ) { }

  ngOnInit() {

    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    this.formControlSetup();
    this.getAllStudentInfo();
    this.getAllSections();

    this.isLoaded = true;
  }


  private getAllSections(): any {
    let apiAddress = "api/section/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let sections = res as Section[];

        // Get all the possible years from the sections.
        for (let x = 0; x < sections.length; x++) {
          let year = sections[x].start_Date.toString().slice(0, 4);
          if (!this.years.includes(year)) {
            this.years.push(year);
          }
        }

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  private getAllStudentInfo() {

    let apiAddress = "api/studentinfo/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentInfo = res as StudentInfo[];

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.studentTranscriptForm.controls[controlName].invalid && this.studentTranscriptForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentTranscriptForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  private redirectToReport(formValue) {
    // If its a student
    if (sessionStorage.getItem('studentId')) {
      let studentId = sessionStorage.getItem('studentId');

      if (this.bySemester === true) {
        this.router.navigate(['/reports/studenttranscript/report/' + studentId + "/" + formValue.semester]);
      } else if (this.byYear === true) {
        this.router.navigate(['/reports/studenttranscript/report/' + studentId + "/" + formValue.year]);
      }

    } else {
      if (this.bySemester === true) {
        this.router.navigate(['/reports/studenttranscript/report/' + formValue.student_Id + "/" + formValue.semester]);
      } else if (this.byYear === true) {
        this.router.navigate(['/reports/studenttranscript/report/' + formValue.student_Id + "/" + formValue.year]);
      }
    }

  }

  private goHome() {
    this.router.navigate(['/home']);
  }

  private Semester() {
    this.bySemester = true;
    this.byYear = false;
    this.formControlSetup();
  }

  private Year() {
    this.byYear = true;
    this.bySemester = false;
    this.formControlSetup();
  }

  private formControlSetup() {
    if (this.typeCode === 1) {
      if (this.byYear) {
        this.studentTranscriptForm = new FormGroup({
          student_Id: new FormControl('', [Validators.required]),
          year: new FormControl('', [Validators.required]),
          semester: new FormControl('')
        });
      } else if (this.bySemester) {
        this.studentTranscriptForm = new FormGroup({
          student_Id: new FormControl('', [Validators.required]),
          semester: new FormControl('', [Validators.required]),
          year: new FormControl(''),
        });
      }
    } else {
      if (this.byYear) {
        this.studentTranscriptForm = new FormGroup({
          student_Id: new FormControl(''),
          year: new FormControl('', [Validators.required]),
          semester: new FormControl('')
        });
      } else if (this.bySemester) {
        this.studentTranscriptForm = new FormGroup({
          student_Id: new FormControl(''),
          semester: new FormControl('', [Validators.required]),
          year: new FormControl(''),
        });
      }
    }
  }

}
