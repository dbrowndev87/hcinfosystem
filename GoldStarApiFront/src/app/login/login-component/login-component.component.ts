import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { Globals } from 'src/app/globals';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage: String = "";
  public userForm: FormGroup;
  private loggedin = false;
  private loading = false;
  private userLogin: UserLogin;
  private user: User;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private globals: Globals
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

  private executeLogin(userFormValue) {
    this.loading = true;
    let username = userFormValue.username;
    let password = userFormValue.password;

    // Get user Login Stuff
    let apiUrlUserLogin = 'api/userLogin/username/' + username;
    this.repository.getData(apiUrlUserLogin)
      .subscribe((userLogin: UserLogin) => {

        // Set userLogin and if the passwords match set session.
        this.userLogin = userLogin as UserLogin;

        // If the password match, check inactivity
        if (this.userLogin.password === password) {

          // check inactivity
          if (this.userLogin.active === true) {

            // Get the TypeCode from Users table
            let apiUrlUser = 'api/user/' + this.userLogin.user_Id;
            this.repository.getData(apiUrlUser)
              .subscribe(user => {

                // get user inform and set the typecode
                this.user = user as User;

                // If everyting passes set sessions
                sessionStorage.setItem("isLoggedIn", "true");
                sessionStorage.setItem('typeCode', this.user.type_Code.toString());

                // Do a page reload to fix the menu bar.
                this.globals.reloadPage();
              },
                (error => {
                  this.errorHandler.handleError(error);
                  this.errorMessage = this.errorHandler.errorMessage;
                })
              );
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
          $('#errorModal').modal();
        }
      },
        // GetData error.
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }

  public redirectToHome() {
    this.router.navigate(['/home']);
  }

}
