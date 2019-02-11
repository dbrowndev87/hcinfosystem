/**
 * Name: User-Update Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the User-Update view and process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { Md5 } from 'ts-md5';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-userlogin-update',
  templateUrl: './userlogin-update.component.html',
  styleUrls: ['./userlogin-update.component.css']
})

export class UserloginUpdateComponent implements OnInit, OnDestroy {


  public errorMessage = '';
  public userLogin: UserLogin;
  public userLoginForm: FormGroup;
  public isLoaded = false;
  public changePassword = false;
  public buttonText = "Change Password";
  public md5 = new Md5();
  public typeCode;

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  constructor(
    public repository: RepositoryService,
    public router: Router,
    public errorHandler: ErrorHandlerService,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // Set the form options and get user information.
    this.setUserForm(this.changePassword);
    this.getUserLoginByUsername();
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    // If a student access the page enable the change password
    if (parseInt(sessionStorage.getItem('typeCode'), 0) === 3) {
      this.changePassword = true;
    }
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  /**
   * This method gets the user information from the api.
   */
  public getUserLoginByUsername() {
    let username: string = this.activeRoute.snapshot.params['username'];
    let userLoginByUsernameUrl = `api/userlogin/username/${username}`;

    this.subscriptions.push(this.repository.getData(userLoginByUsernameUrl)
      .subscribe((userLogin: UserLogin) => {
        this.userLogin = userLogin as UserLogin;
        this.patchClear();
        this.isLoaded = true;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }));
  }

  // Validation Function.
  public validateControl(controlName: string) {
    if (this.userLoginForm.controls[controlName].invalid && this.userLoginForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  // Error check.
  public hasError(controlName: string, errorName: string) {
    if (this.userLoginForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  // Re-direction fucntion
  public redirectToUserLoginList() {
    this.router.navigate(['/userlogin/list']);
  }

  // if the form is valid execute update.
  public updateUserLogin(userLoginFormValue) {
    if (this.userLoginForm.valid) {
      this.executeUserLoginUpdate(userLoginFormValue);
    }
  }

  /**
   * Sets the form options based on what you are doing.
   * @param changePassword
   */
  setUserForm(changePassword: boolean) {
    if (changePassword) {
      this.userLoginForm = new FormGroup({
        password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
        active: new FormControl(''),
      });
    } else {
      this.userLoginForm = new FormGroup({
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        active: new FormControl(''),
      });
    }
  }

  /**
   * Update user login information.
   * @param userLoginFormValue
   */
  public executeUserLoginUpdate(userLoginFormValue) {

    // If they selected change password use the new password
    if (this.changePassword === true) {
      this.userLogin.password = this.md5.appendStr(userLoginFormValue.password).end().toString();
    } else {
      // if they dont select change password
      this.userLogin.password = this.userLogin.password;

    }

    this.userLogin.active = userLoginFormValue.active;

    let apiUrl = `api/userlogin/${this.userLogin.username}`;
    this.subscriptions.push(this.repository.update(apiUrl, this.userLogin)
      .subscribe(userLogin => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      ));
  }

  // If they change the password do these actions.
  changePass() {
    if (this.buttonText === "Cancel") {
      this.buttonText = "Change Password";
      this.changePassword = false;
      this.setUserForm(this.changePassword);
      this.patchClear();
    } else {
      this.buttonText = "Cancel";
      this.changePassword = true;
      this.setUserForm(this.changePassword);
      this.patchClear();
    }
  }

  // Re-Patches data to form and clears the password boxes.
  patchClear() {
    this.userLoginForm.patchValue(this.userLogin);
    this.userLoginForm.controls['password'].setValue("");
  }
}