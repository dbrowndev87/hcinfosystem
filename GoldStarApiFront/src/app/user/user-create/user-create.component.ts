import { User } from '../../_interfaces/user.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { RandomUserPassGen } from 'src/app/shared/tools/rupg';
import { Student } from 'src/app/_interfaces/student.model';
import { StudentIdGenerator } from 'src/app/shared/tools/sidg';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

  public errorMessage = "";
  public userForm: FormGroup;
  public userId: any;
  @ViewChild('tCode') tCode: ElementRef;


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private rupg: RandomUserPassGen,
    private sidg: StudentIdGenerator
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      first_Name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      last_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      birth_date: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      type_Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });

    // Get the next user ID.
    let apiAddress = "api/user/0";
    this.repository.getData(apiAddress)
      .subscribe((res: number) => {
        this.userId = res;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.userForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public executeDatePicker(event) {
    this.userForm.patchValue({ 'birth_date': event });
  }

  public createUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  }

  /**
   * This is the method that creates the initial User.
   * @param userFormValue 
   */
  private executeUserCreation(userFormValue) {
    // Get the NExt ID
    this.userId = (this.userId + 1);

    // Make a user interface.
    let user: User = {
      first_Name: userFormValue.first_Name,
      last_Name: userFormValue.last_Name,
      address: userFormValue.address,
      birth_date: userFormValue.birth_date.slice(0, 10).toString(),
      type_Code: parseInt(userFormValue.type_Code, 0),
      eMail: userFormValue.eMail,
      user_Id: this.userId
    };

    // Create user
    let apiUrl = 'api/user';
    this.repository.create(apiUrl, user)
      .subscribe(res => {

        // Generate User Login
        this.generateUserLogin(user);
        // Generate Student Table
        this.generateStudent(user);
        // Success modal.
        $('#successModal').modal();

      },
        // User create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

  /**
   * This method generates the UserLogin from the User information
   * that is passed in.
   * @param user 
   */
  private generateUserLogin(user: User) {

    // Generate a user and password
    let username: string = this.rupg.generateUser(user.first_Name, user.last_Name);
    let password = this.rupg.generatePass();

    // Generate user login info

    let userLogin: UserLogin = {
      username: username,
      password: password,
      user_Id: this.userId,
      active: true
    };

    // Create User Login
    let apiUrlUserLogin = 'api/userlogin';
    this.repository.create(apiUrlUserLogin, userLogin)
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

  /**
  * This method generates the Student from the User information
  * that is passed in.
  * @param user 
  */
  private generateStudent(user: User) {

    // generate a student ID.
    let studentId: number = this.sidg.generateId();

    // Generate Student login info
    let student: Student = {
      Student_Id: studentId,
      Student_Status: "Enrolled",
      User_id: user.user_Id,
      Amount_Owing: 0.0,
      Gpa: 0.0
    };

    // Create User Login
    let apiUrlStudent = 'api/student';
    this.repository.create(apiUrlStudent, student)
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
}
