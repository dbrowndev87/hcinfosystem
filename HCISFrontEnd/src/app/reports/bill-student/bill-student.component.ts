/**
 * Name: Bill Student Component
 * Description: this allows yo to choose which student to generate
 * the bill for
 * 
 * Author: Darcy Brown
 * Date: Febuary 8th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill-student',
  templateUrl: './bill-student.component.html',
  styleUrls: ['./bill-student.component.css']
})
export class BillStudentComponent implements OnInit {

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
        // console.log(this.studentInfo);

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
    this.router.navigate(['/reports/billstudent/report/' + formValue.student_Id]);
  }

  private goHome() {
    this.router.navigate(['/home']);
  }

}
