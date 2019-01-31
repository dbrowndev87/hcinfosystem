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
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/_interfaces/student.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Transaction } from 'src/app/_interfaces/transaction.model';
import { TransactionIdGenerator } from 'src/app/shared/tools/tidg';
import { Subscription } from 'rxjs';


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
  private transId: number;
  private isLoaded = false;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private tidg: TransactionIdGenerator
  ) { }

  ngOnInit() {
    this.studentPaymentForm = new FormGroup({
      amount: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });

    this.transId = this.tidg.generateId();
    // This is gets the students information and student
    // table object.
    this.getStudent();
  }

  /**
     * This method gets the Student table info by User id
     * 
     * Author: Darcy Brown
     * Date: January 25th, 2019
     */
  private getStudent() {
    let apiAddress = "api/student/";
    this.repository.getData(apiAddress + parseInt(sessionStorage.getItem('studentId'), 0))
      .subscribe(student => {

        // get student table info
        this.student = student as Student;

        // get the full student Information with the id
        this.getStudentInfo(this.student.student_Id);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
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
        this.errorMessage = "Unable to access API";
        this.isLoaded = true;
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

        // Get Vaid trans ID and initialize payment process.
        this.getValidTransID(studentPaymentFormValue);

        // success after a completed payment.
        $('#successModal').modal();
      }
    }
  }

  /**
   * This is a loop method which geenrates a TransID and makes sure it doesn not
   * exist in the Database before using it.
   * 
   * Author: Darcy Brown
   * Date: January 27th, 2019
   */
  private getValidTransID(studentPaymentFormValue) {

    // Store
    let subscription: Subscription;

    // Delcare a loop function
    let loop = (transId: number) => {

      // Get a subsctiption to the API
      let apiAddress = "api/transaction/";
      subscription = this.repository.getData(apiAddress + transId)
        .subscribe(res => {

          // Assign Temporary Trasnaction
          let tempTransaction = res as Transaction;

          // Check the transaction returning from API
          if (tempTransaction.student_Id === 0) {

            // If the transaction returns a 0 id value.
            this.transId = transId;
            // Unsubscribe to clear memory
            subscription.unsubscribe();

            // Execute the rest of the payment.
            this.executeStudentUpdate(studentPaymentFormValue);

          } else {
            // If the Transaction comes back populated.
            // re-loop
            loop(this.tidg.generateId());
          }
        });
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
        this.isLoaded = true;
      };
    };

    // Start the initial loop.
    loop(this.tidg.generateId());
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

        this.studentPaymentForm.get('amount').setValue('');
        this.studentPaymentForm.get('amount').markAsUntouched();

        // success.
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
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
      trans_Id: this.transId,
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
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
        })
      );
  }
}