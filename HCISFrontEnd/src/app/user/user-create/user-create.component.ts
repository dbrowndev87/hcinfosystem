/**
 * Name: User-Create Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the User-Create view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */

import { User } from '../../_interfaces/user.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { Semesters } from 'src/app/shared/tools/semesters';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit, OnDestroy {

  public errorMessage = "";
  public userForm: FormGroup;
  public userId: any;
  public depts: Department[];
  public userType;
  public userTypeName = ['Admin', 'Faculty', 'Student'];
  public isLoaded = false;
  public param;
  public successMessage = "";
  public semesters = new Semesters();


  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public rupg: RandomUserPassGen,
    public sidg: StudentIdGenerator,
    public globals: Globals,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.param = params['id'];
      this.initialiseState(); // reset and set based on new parameter this time
    });
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  public initialiseState() {
    // If the usertype is not any of the type codes go to 404
    if (this.userType > 3 || this.userType < 1) {
      this.router.navigate(['/404']);
    }

    // get the user type form the URL
    this.userType = parseInt(this.activeRoute.snapshot.params['id'], 0);
    // Declare which form to use
    this.declareFormType();

    // Get the next user ID.
    let apiAddress = "api/user/0";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe((res: number) => {
        this.userId = res;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };

    // get the departments
    this.getAllDepartments();

    this.isLoaded = true;
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
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];

        if (this.userType > 1 && this.userType <= 3) {
          for (let x = 0; x < this.depts.length; x++) {
            if (this.depts[x].dept_Name === "Administration") {
              this.depts.splice(x, 1);
            }
          }
        }

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
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
    this.userForm.patchValue({ 'birth_Date': event });
  }

  public executeDatePickerStartDate(event) {
    this.userForm.patchValue({ 'start_Date': event });
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
  public executeUserCreation(userFormValue) {

    // Increment the ID
    this.userId = (this.userId + 1);
    // set up user information
    let deptId: number;

    // Department ID Based on user type.
    if (this.userType === 1) {
      deptId = 1;
    } else {
      deptId = userFormValue.dept_Id;
    }

    // Make a user interface.
    let user: User = {
      first_Name: userFormValue.first_Name,
      last_Name: userFormValue.last_Name,
      address: userFormValue.address,
      birth_Date: userFormValue.birth_Date,
      start_Date: userFormValue.start_Date,
      type_Code: this.userType,
      eMail: userFormValue.eMail,
      user_Id: this.userId,
      dept_Id: deptId
    };


    // Create user
    let apiUrl = 'api/user';
    this.subscriptions.push(this.repository.create(apiUrl, user)
      .subscribe(res => {

        // Start the userLogin process.
        this.getValidUsername(user);

        if (this.userType === 3) {
          // Start Student Process
          this.getValidStudentID(user);

        } else if (this.userType === 2) {
          // Start Faculty Process
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
          this.errorMessage = "Unable to access API";
        })
      ));
  }

  /**
 * This is a loop method which generates a Username and makes sure it does not
 * exist in the Database before using it.
 * 
 * Author: Darcy Brown
 * Date: January 27th, 2019
 */
  public getValidUsername(user: User) {

    // declare id and subsrciption
    let subscription: Subscription;
    let tempUsername: string;

    // Delcare a loop function
    let loop = (username: string) => {

      // Get a subsctiption to the API
      let apiAddress = "api/userlogin/username/";
      this.subscriptions.push(this.repository.getData(apiAddress + username)
        .subscribe(res => {

          // Assign Temporary Trasnaction
          let userLogin = res as UserLogin;
          // Check the transaction returning from API
          if (userLogin.user_Id === 0) {

            // If the transaction returns a 0 id value.
            tempUsername = username;

            // Execute the rest of the student creation
            this.generateUserLogin(username);

          } else {
            // If the student comes back populated
            // re-loop
            loop(this.rupg.generateUser(user.first_Name, user.last_Name));
          }
        }));
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
    };

    // Start the initial loop.
    loop(this.rupg.generateUser(user.first_Name, user.last_Name));
  }

  /**
  * This is a loop method which geenrates a Student ID and makes sure it does not
  * exist in the Database before using it.
  * 
  * Author: Darcy Brown
  * Date: January 27th, 2019
  */
  public getValidStudentID(user: User) {

    // declare id and subsrciption
    let subscription: Subscription;
    let studentId: number;

    // Delcare a loop function
    let loop = (student_Id: number) => {

      // Get a subsctiption to the API
      let apiAddress = "api/student/";
      this.subscriptions.push(this.repository.getData(apiAddress + student_Id)
        .subscribe(res => {

          // Assign Temporary Trasnaction
          let tempStudent = res as Student;

          // Check the transaction returning from API
          if (tempStudent.student_Id === 0) {

            // If the transaction returns a 0 id value.
            studentId = student_Id;

            // Execute the rest of the student creation
            this.generateStudent(user, studentId);

          } else {
            // If the student comes back populated
            // re-loop
            loop(this.sidg.generateId());
          }
        }));
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
    };

    // Start the initial loop.
    loop(this.sidg.generateId());
  }


  // Clear user List.
  public clearUserForm() {

    // Clear the Form
    this.userForm.get('first_Name').setValue('');
    this.userForm.get('first_Name').markAsUntouched();
    this.userForm.get('last_Name').setValue('');
    this.userForm.get('last_Name').markAsUntouched();
    this.userForm.get('eMail').setValue('');
    this.userForm.get('eMail').markAsUntouched();
    this.userForm.get('birth_Date').setValue('');
    this.userForm.get('birth_Date').markAsUntouched();
    this.userForm.get('address').setValue('');
    this.userForm.get('address').markAsUntouched();
    this.userForm.get('start_Date').setValue('');
    this.userForm.get('start_Date').markAsUntouched();

    if (this.userType > 1) {
      this.userForm.get('dept_Id').setValue('');
      this.userForm.get('dept_Id').markAsUntouched();
    }
  }

  public redirectToUserList() {
    if (this.userType === 1) {
      this.router.navigate(['/admin/list']);
    } else if (this.userType === 2) {
      this.router.navigate(['/faculty/list']);
    } else if (this.userType === 3) {
      this.router.navigate(['/student/list']);
    }
  }

  /**
   * This method generates the UserLogin from the User information
   * that is passed in.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   * @param user 
   */
  public generateUserLogin(username: string) {
    let md5 = new Md5();
    let password = md5.appendStr('password').end();
    // this.rupg.generatePass(); Password Generator implementation.

    // Generate user login info
    let userLogin: UserLogin = {
      username: username,
      password: password.toString(),
      user_Id: this.userId,
      active: true
    };

    // Create User Login
    let apiUrlUserLogin = 'api/userlogin';
    this.subscriptions.push(this.repository.create(apiUrlUserLogin, userLogin)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(res => {
        return;
      },
        // UserLogin create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));
  }

  /**
  * This method generates the Student from the User information
  * that is passed in.
  * 
  * Author: Darcy Brown
  * Date: January 24th
  * @param user 
  */
  public generateStudent(user: User, studentId: number) {

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
    this.subscriptions.push(this.repository.create(apiUrlStudent, student)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(res => {
        return;
      },
        // UserLogin create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));

  }

  /**
 * This method generates the Faculty table information with the
 * that is passed in.
 * 
 * Author: Darcy Brown
 * Date: January 24th
 * @param user 
 */
  public generateFaculty(user: User) {

    // Generate Student login info
    let faculty: Faculty = {
      faculty_Id: 0,
      faculty_Status: "Full Time",
      user_Id: user.user_Id,
    };

    // Create User Login
    let apiUrlFaculty = 'api/faculty';
    this.subscriptions.push(this.repository.create(apiUrlFaculty, faculty)
      // tslint:disable-next-line: no-shadowed-variable
      .subscribe(res => {
        return;
      },
        // UserLogin create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));
  }

  /**
   * This is seperate form formats one for student and faculty which
   * has the dropdown with requirements validators and then the one with
   * no dropdown and validators for admin
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  declareFormType() {
    // Admin form (No department ID selection)
    if (this.userType === 1) {
      this.userForm = new FormGroup({
        first_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        last_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
        birth_Date: new FormControl('', [Validators.required]),
        start_Date: new FormControl('', [Validators.required]),
        eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      });
    } else {
      // Student and Faculty form
      this.userForm = new FormGroup({
        first_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        last_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
        address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
        birth_Date: new FormControl('', [Validators.required]),
        eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
        dept_Id: new FormControl('', Validators.required),
        start_Date: new FormControl('', [Validators.required]),
      });
    }
  }
}
