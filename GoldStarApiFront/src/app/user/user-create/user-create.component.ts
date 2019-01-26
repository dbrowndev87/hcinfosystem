/**
 * Name: User-Create Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the User-Create view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */

import { User } from '../../_interfaces/user.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { RandomUserPassGen } from 'src/app/shared/tools/rupg';
import { Student } from 'src/app/_interfaces/student.model';
import { StudentIdGenerator } from 'src/app/shared/tools/sidg';
import { Department } from 'src/app/_interfaces/department.model';
import { Md5 } from 'ts-md5/dist/md5';
import { Globals } from 'src/app/globals';
import { Faculty } from 'src/app/_interfaces/faculty.model';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {

  public errorMessage = "";
  public userForm: FormGroup;
  public userId: any;
  private depts: Department[];
  private userType;
  private md5 = new Md5();
  private successMessage = "";

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rupg: RandomUserPassGen,
    private sidg: StudentIdGenerator,
    private globals: Globals
  ) {
    // get the user type form the URL
    this.userType = parseInt(this.activeRoute.snapshot.params['id'], 0);

    // If the usertype is not any of the type codes go to 404
    if (this.userType > 3 || this.userType < 1) {
      this.router.navigate(['/404']);
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      first_Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      last_Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      birth_date: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      // type_Code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      dept_Id: new FormControl('', Validators.required),
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

    // het the departments
    this.getAllDepartments();
  }

  /**
   * This method gets all the departments into an array of
   * departments so the data can be used.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   */
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];

        if (this.userType > 1 && this.userType <= 3) {
          for (let x = 0; x < this.depts.length; x++) {
            if (this.depts[x].dept_Name === "Administrator") {
              this.depts.splice(x, 1);
            }
          }
        }

      }),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  // Form Control validation method
  public validateControl(controlName: string) {
    if (this.userForm.controls[controlName].invalid && this.userForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  // If the control has an error
  public hasError(controlName: string, errorName: string) {
    if (this.userForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  // Execute the Date Picker object.
  public executeDatePicker(event) {
    this.userForm.patchValue({ 'birth_date': event });
  }

  // Create user if form is valid.
  public createUser(userFormValue) {
    if (this.userForm.valid) {
      this.executeUserCreation(userFormValue);
    }
  }

  /**
   * This is the method that creates the initial User.
   * 
   * Author: Darcy Brown
   * Date: January 24th
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
      type_Code: this.userType,
      eMail: userFormValue.eMail,
      user_Id: this.userId,
      dept_Id: userFormValue.dept_Id
    };


    // Create user
    let apiUrl = 'api/user';
    this.repository.create(apiUrl, user)
      .subscribe(res => {

        // Generate User Login
        this.generateUserLogin(user);

        if (this.userType === 3) {
          // Generate Student Table
          this.generateStudent(user);

        } else if (this.userType === 2) {
          // Generate faculty table.
          this.generateFaculty(user);

        }

        // User Type Success Modal Mesasge
        if (this.userType === 1) {
          this.successMessage = "Admin added successfuly!";
        } else if (this.userType === 2) {
          this.successMessage = "Faculty added successfuly!";
        } else if (this.userType === 3) {
          this.successMessage = "Student added successfuly!";
        }

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

  // Redicrect to User List.
  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

  /**
   * This method generates the UserLogin from the User information
   * that is passed in.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   * @param user 
   */
  private generateUserLogin(user: User) {

    // Generate a user and password
    let username: string = this.rupg.generateUser(user.first_Name, user.last_Name);
    let password = this.md5.appendStr('password').end();
    // this.rupg.generatePass();

    // Generate user login info

    let userLogin: UserLogin = {
      username: username,
      password: password.toString(),
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
  * 
  * Author: Darcy Brown
  * Date: January 24th
  * @param user 
  */
  private generateStudent(user: User) {

    // generate a student ID.
    let studentId: number = this.sidg.generateId();

    // Generate Student login info
    let student: Student = {
      student_Id: studentId,
      student_Status: "Enrolled",
      user_id: user.user_Id,
      amount_Owing: 0.0,
      gpa: 0.0
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

  /**
 * This method generates the Faculty table information with the
 * that is passed in.
 * 
 * Author: Darcy Brown
 * Date: January 24th
 * @param user 
 */
  private generateFaculty(user: User) {

    // Generate Student login info
    let faculty: Faculty = {
      faculty_Id: 0,
      faculty_Status: "Full Time",
      user_Id: user.user_Id,
    };

    // Create User Login
    let apiUrlFaculty = 'api/faculty';
    this.repository.create(apiUrlFaculty, faculty)
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
