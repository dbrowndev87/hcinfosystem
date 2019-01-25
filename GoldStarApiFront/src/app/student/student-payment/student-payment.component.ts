import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Department } from 'src/app/_interfaces/department.model';
import { User } from 'src/app/_interfaces/user.model';
import { Student } from 'src/app/_interfaces/student.model';
import { of } from 'rxjs';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css']
})
export class StudentPaymentComponent implements OnInit {


  public errorMessage = '';
  public studentInfo: StudentInfo;
  public student: Student;
  public studentPaymentForm: FormGroup;


  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.studentPaymentForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    // This is gets the students information and student
    // table object.
    this.getStudent();
    this.getStudentInfo();
  }

  /**
   * This method gets the Student table info by User id
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  private getStudent() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiAddress = "api/student/" + sessionStorage.getItem('userId');
    this.repository.getData(apiAddress)
      .subscribe(student => {
        this.student = student as Student;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  /**
   * This method gets student information pack and puts then into the
   * for display in view.
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  public getStudentInfo() {
    let apiAddress = "api/studentinfo/";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentInfo = res as StudentInfo;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.studentPaymentForm.controls[controlName].invalid && this.studentPaymentForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentPaymentForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  updateViewInformation() {
    // Update the view information after success.
  }

  /**
   * This is the payment ammound validation method that is accomplished
   * when checking if the form is valid.
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   * @param studentPaymentFormValue 
   */
  public updateStudent(studentPaymentFormValue) {
    if (this.studentPaymentForm.valid) {

      // Payment Ammount Validation.
      if (this.student.amount_Owing < studentPaymentFormValue.amount) {

        // More than ammount owing
        this.errorMessage = "You entered an amount more than what you owe";
        $('#errorModal').modal();

      } else if (parseInt(studentPaymentFormValue.amount, 0) === 0
        || (parseInt(studentPaymentFormValue.amount, 0) === NaN)) {

        // Invalid Amount
        this.errorMessage = "Invalid payment amount";
        $('#errorModal').modal();

      } else {
        this.executeStudentUpdate(studentPaymentFormValue);
      }

    }
  }

  /**
   * This method performs the update.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   *
   * @param studentPaymentFormValue 
   */
  private executeStudentUpdate(studentPaymentFormValue) {

    this.student.amount_Owing = this.student.amount_Owing - studentPaymentFormValue.amount;

    let apiUrl = `api/student/${this.student.student_Id}`;
    this.repository.update(apiUrl, this.student)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

}

