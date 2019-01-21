import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  public errorMessage = '';
  public user: User;
  public userForm: FormGroup;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private activeRoute: ActivatedRoute
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

    this.getUserById();
  }

  private getUserById() {
    let id: string = this.activeRoute.snapshot.params['id'];

    let userByIdUrl = `api/user/${id}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);

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
    this.router.navigate(['/user/list']);
  }

  public updateUser(userFromValue) {
    if (this.userForm.valid) {
      this.executeUserUpdate(userFromValue);
    }
  }
  public executeDatePicker(event) {
    this.userForm.patchValue({ 'birth_Date': event });
  }

  private executeUserUpdate(userFormValue) {

    this.user.first_Name = userFormValue.first_Name;
    this.user.last_Name = userFormValue.last_Name;
    this.user.address = userFormValue.address;
    this.user.birth_date = userFormValue.birth_date.slice(0, 10);
    this.user.type_Code = parseInt(userFormValue.type_Code, 0);
    this.user.eMail = userFormValue.eMail;
    this.user.user_Id = this.user.user_Id;

    let apiUrl = `api/user/${this.user.user_Id}`;
    this.repository.update(apiUrl, this.user)
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
