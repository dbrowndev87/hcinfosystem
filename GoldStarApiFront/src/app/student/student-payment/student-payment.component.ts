/**
 * Name: Student Payment Component
 * Description: This is the student payment component which allows the student to 
 * pay for their tuition.
 * 
 * Author: Darcy Brown
 * Date: January 25th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/_interfaces/student.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Transaction } from 'src/app/_interfaces/transaction.model';

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
  private isLoaded = false;

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
    console.log(this.formatDate());

  }

  /**
   * This method gets the Student table info by User id
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  private getStudent() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiAddress = "api/student/user/";
    this.repository.getData(apiAddress + parseInt(sessionStorage.getItem('userId'), 0))
      .subscribe(student => {

        // get student table info
        this.student = student as Student;

        // get the full student Information with the id
        this.getStudentInfo(this.student.student_Id);
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
  public getStudentInfo(studentId: number) {
    let apiAddress = "api/studentinfo/";
    this.repository.getData(apiAddress + studentId)
      .subscribe(res => {

        this.studentInfo = res as StudentInfo;

        // set laoded to true
        this.isLoaded = true;
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
    this.getStudent();
  }

  /**
   * This is the payment ammound validation method that is accomplished
   * when checking if the form is valid.
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   * @param studentPaymentFormValue 
   */
  public makePayment(studentPaymentFormValue) {
    if (this.studentPaymentForm.valid) {

      // Payment Ammount Validation.
      if (this.student.amount_Owing < studentPaymentFormValue.amount) {

        // More than ammount owing
        this.errorMessage = "You entered an amount more than what you owe";
        $('#errorModal').modal();

      } else if (parseFloat(studentPaymentFormValue.amount) <= 0
        || (parseFloat(studentPaymentFormValue.amount) === NaN)) {

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
   * Date: January 25th, 2019
   *
   * @param studentPaymentFormValue 
   */
  private executeStudentUpdate(studentPaymentFormValue) {

    let apiUrl = `api/student/${this.student.student_Id}`;
    this.repository.update(apiUrl, this.student)
      .subscribe(res => {

        // Make transaction
        this.createTransaction(studentPaymentFormValue.amount);

        // success.
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }


  /**
 * This method performs the update.
 * 
 * Author: Darcy Brown
 * Date: January 25th, 2019
 *
 * @param studentPaymentFormValue 
 */
  createTransaction(amount: number) {

    // Generate Transaction 
    let transaction: Transaction = {
      trans_Amount: amount,
      trans_Date: new Date(),
      student_Id: this.student.student_Id
    };

    // Create User Login
    let apiUrlTransaction = 'api/transaction';
    this.repository.create(apiUrlTransaction, transaction)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(res => {
        return;
      },
        // UserLogin create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  formatDate() {
    return new Date().toISOString().slice(0, 10);
  }
}




