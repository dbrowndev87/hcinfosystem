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
  public userForm: FormGroup;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(45)]),
      userId: new FormControl('', [Validators.required, Validators.maxLength(6)])
    });

    this.getStudentById();
  }
  private getStudentById() {
    let id: string = this.activeRoute.snapshot.params['id'];

    let userByIdUrl = `api/user/${id}`;
    let confirmPassword = this.userForm.get('confirmPassword');

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.userLogin = res as UserLogin;
        this.userForm.patchValue(this.userLogin);
        confirmPassword.setValue(this.userLogin.password);
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
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
  public redirectToUserList() {
    this.router.navigate(['/userlogin/list']);
  }

  public updateUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserUpdate(userFormValue);
    }
  }

  private executeUserUpdate(userFormValue) {
    this.userLogin.username = userFormValue.username;
    this.userLogin.password = userFormValue.password;
    this.userLogin.user_Id = userFormValue.userId;


    console.log(this.userLogin);
    let apiUrl = `api/userlogin/${this.userLogin.username}`;
    this.repository.update(apiUrl, this.userLogin)
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
