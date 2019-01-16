import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';

@Component({
  selector: 'app-userlogin-update',
  templateUrl: './userlogin-update.component.html',
  styleUrls: ['./userlogin-update.component.css']
})
export class UserloginUpdateComponent implements OnInit {


  public errorMessage = '';
  public userLogin: UserLogin;
  public userLoginForm: FormGroup;
  public isLoaded = false;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
      active: new FormControl(''),
    });

    this.getUserLoginByUsername();
  }

  private getUserLoginByUsername() {
    let username: string = this.activeRoute.snapshot.params['username'];

    let userLoginByUsernameUrl = `api/userlogin/username/${username}`;
    let confirmPassword = this.userLoginForm.get('confirmPassword');

    this.repository.getData(userLoginByUsernameUrl)
      .subscribe((userLogin: UserLogin) => {
        this.userLogin = userLogin as UserLogin;
        this.userLoginForm.patchValue(this.userLogin);
        confirmPassword.setValue(this.userLogin.password);
        this.isLoaded = true;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public validateControl(controlName: string) {
    if (this.userLoginForm.controls[controlName].invalid && this.userLoginForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.userLoginForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }
  public redirectToUserLoginList() {
    this.router.navigate(['/userlogin/list']);
  }

  public updateUserLogin(userLoginFormValue) {
    if (this.userLoginForm.valid) {
      this.executeUserLoginUpdate(userLoginFormValue);
    }
  }

  private executeUserLoginUpdate(userLoginFormValue) {

    this.userLogin.password = userLoginFormValue.password;
    this.userLogin.active = userLoginFormValue.active;

    let apiUrl = `api/userlogin/${this.userLogin.username}`;
    this.repository.update(apiUrl, this.userLogin)
      .subscribe(userLogin => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        })
      );
  }
}
