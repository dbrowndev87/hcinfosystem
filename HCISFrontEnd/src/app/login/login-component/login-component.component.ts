/**
 * Name: Login Component
 * Description: This is the Login component which has all the code and attributes
 * which pertain to the login view, and process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { Globals } from 'src/app/globals';
import { User } from 'src/app/_interfaces/user.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Student } from 'src/app/_interfaces/student.model';
import { Subscription } from 'rxjs';
import { Faculty } from 'src/app/_interfaces/faculty.model';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  public errorMessage: String = "";
  public userForm: FormGroup;
  public loading = false;
  public userLogin: UserLogin;
  public user: User;

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public globals: Globals
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/home']);
    }

    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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

  public createUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeLogin(userFormValue);
    }
  }

  public executeLogin(userFormValue) {
    // Set loading and make MD5 object
    this.loading = true;
    let md5 = new Md5();

    // Get input information and hash the password.
    let username = userFormValue.username;
    let password = md5.appendStr(userFormValue.password).end();

    // Get user Login Stuff
    let apiUrlUserLogin = 'api/userLogin/username/' + username;

    this.subscriptions.push(this.repository.getData(apiUrlUserLogin)
      .subscribe((userLogin: UserLogin) => {

        // Set userLogin and if the passwords match set session.
        this.userLogin = userLogin as UserLogin;

        // If the password match, check inactivity
        if (this.userLogin.password === password) {

          // check inactivity
          if (this.userLogin.active === true) {

            // Get the TypeCode from Users table
            let apiUrlUser = 'api/user/' + this.userLogin.user_Id;
            this.subscriptions.push(this.repository.getData(apiUrlUser)
              .subscribe(user => {

                // get user inform and set the typecode
                this.user = user as User;


                // Depending on the type code perform actions.
                if (this.user.type_Code === 2) {
                  this.getFacultyId();
                } else if (this.user.type_Code === 3) {
                  this.getStudentId();
                } else {
                  sessionStorage.setItem('userId', this.user.user_Id.toString());
                  this.reload();
                }

                // If everyting passes set sessions
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem('typeCode', this.user.type_Code.toString());
              },
                (error => {
                  this.errorHandler.handleError(error);
                  this.errorMessage = "Unable to access API";
                  this.loading = false;
                })
              ));
          } else {
            // If account is inactive
            this.loading = false;
            this.errorMessage = "Account is Inactive! Talk to Administration";
            $('#errorModal').modal();
          }
          // Login Error
        } else {
          this.loading = false;
          this.errorMessage = "Invalid login information.";
          this.userLogin = null;
          $('#errorModal').modal();
        }
      },
        // GetData error.
        (error => {
          this.errorHandler.handleError(error);
          this.loading = false;
          this.errorMessage = "Unable to access API";
        })
      ));
  }

  public redirectToHome() {
    this.router.navigate(['/home']);
  }

  public getStudentId() {
    // Assign subscription
    let subscription: Subscription;
    let apiAddress = "api/student/user/";

    // Get Student ID with the user ID and store it.
    this.subscriptions.push(this.repository.getData(apiAddress + this.user.user_Id)
      .subscribe(res => {
        let student = res as Student;
        sessionStorage.setItem('studentId', student.student_Id.toString());
        this.reload();
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public getFacultyId() {

    // Assign subscription
    let subscription: Subscription;
    let apiAddress = "api/faculty/user/";

    // Get Student ID with the user ID and store it.
    this.subscriptions.push(this.repository.getData(apiAddress + this.user.user_Id)
      .subscribe(res => {
        let faculty = res as Faculty;
        sessionStorage.setItem('facultyId', faculty.faculty_Id.toString());
        this.reload();
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public reload() {
    this.globals.reloadPage();
  }

}
