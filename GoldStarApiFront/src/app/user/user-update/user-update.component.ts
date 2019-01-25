/**
 * Name: User-Update Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the User-Update view and process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Department } from 'src/app/_interfaces/department.model';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  public errorMessage = '';
  public user: User;
  private deptIndex: number;
  public userForm: FormGroup;
  public depts: Department[];
  @ViewChild('dCode') dCode: ElementRef;

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
      dept_Id: new FormControl('', [Validators.required]),
    });

    // This is get user and get all department calls.
    this.getUserById();
    this.getAllDepartments();
  }

  /**
   * This method gets the User information by ID
   * 
   * Author: Darcy Brown
   * Date: January 24th
   */
  private getUserById() {
    let id: string = this.activeRoute.snapshot.params['id'];

    let userByIdUrl = `api/user/${id}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
        this.userForm.patchValue(this.user);
        this.deptIndex = this.user.dept_Id - 1;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  /**
   * This method gets all the departments and puts then into the
   * array.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   */
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
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

  /**
   * This method performs the update.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   *
   * @param userFormValue 
   */
  private executeUserUpdate(userFormValue) {

    this.user.first_Name = userFormValue.first_Name;
    this.user.last_Name = userFormValue.last_Name;
    this.user.address = userFormValue.address;
    this.user.birth_date = userFormValue.birth_date.slice(0, 10);
    this.user.type_Code = parseInt(userFormValue.type_Code, 0);
    this.user.eMail = userFormValue.eMail;
    this.user.user_Id = this.user.user_Id;
    this.user.dept_Id = userFormValue.dept_Id;

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
