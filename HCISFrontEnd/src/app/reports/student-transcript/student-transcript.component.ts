import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_interfaces/course.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';

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

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.studentTranscriptForm = new FormGroup({
      student_Id: new FormControl('', [Validators.required])
    });

    this.getAllStudentInfo();
    this.isLoaded = true;
  }


  private getAllStudentInfo() {

    let apiAddress = "api/studentinfo/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentInfo = res as StudentInfo[];
        console.log(this.studentInfo);

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
    this.router.navigate(['/reports/studenttranscript/report/' + formValue.student_Id]);
  }

  private goHome() {
    this.router.navigate(['/home']);
  }

}
