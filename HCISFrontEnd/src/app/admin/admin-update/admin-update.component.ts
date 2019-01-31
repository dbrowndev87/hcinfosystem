/**
 * Name: Admin Update Component
 * Description: This is the  Admin Update component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 26th, 2019
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrls: ['./admin-update.component.css']
})
export class AdminUpdateComponent implements OnInit {


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
      birth_Date: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      type_Code: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });

    // This is get user and get all department calls.
    this.getUserById();
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
        this.userForm.get('birth_Date').setValue(this.user.birth_Date.toLocaleString('yyyy/mm/dd').slice(0, 10));
        this.deptIndex = this.user.dept_Id - 1;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
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
    this.router.navigate(['/admin/list']);
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
    this.user.birth_Date = userFormValue.birth_Date;
    this.user.type_Code = parseInt(userFormValue.type_Code, 0);
    this.user.eMail = userFormValue.eMail;
    this.user.user_Id = this.user.user_Id;
    this.user.dept_Id = this.user.dept_Id;

    let apiUrl = `api/user/${this.user.user_Id}`;
    this.repository.update(apiUrl, this.user)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );
  }
}
