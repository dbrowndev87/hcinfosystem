/**
 * Name: Faculty-Update component
 * Description: This is the Faculty update component which has all the code and attributes
 * which pertain to the Faculty update view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 29th, 2019
 */
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Student } from 'src/app/_interfaces/student.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Faculty } from 'src/app/_interfaces/faculty.model';
import { User } from 'src/app/_interfaces/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faculty-update',
  templateUrl: './faculty-update.component.html',
  styleUrls: ['./faculty-update.component.css']
})
export class FacultyUpdateComponent implements OnInit, OnDestroy {

  public errorMessage = "";
  public facultyUpdateForm: FormGroup;
  private facultyInfo: FacultyInfo;
  private depts: Department[];
  private facultyId: number;
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.facultyUpdateForm = new FormGroup({
      first_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      last_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      birth_Date: new FormControl('', [Validators.required]),
      start_Date: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dept_Id: new FormControl('', [Validators.required]),
      faculty_Status: new FormControl(''),
    });

    // Get the ID from the URL
    this.facultyId = this.activeRoute.snapshot.params['id'];

    // Get student Information
    this.getFacultyInfo();
    this.getAllDepartments();
  }


  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  /**
   * This method gets Faculty information pack and puts then into the
   * for display in view.
   * 
   * Author: Darcy Brown
   * Date: January 29th, 2019
   */
  public getFacultyInfo() {
    let apiAddress = "api/facultyinfo/";
    this.subscriptions.push(this.repository.getData(apiAddress + this.facultyId)
      .subscribe(facultyinfo => {

        this.facultyInfo = facultyinfo as FacultyInfo;
        this.facultyUpdateForm.patchValue(this.facultyInfo);
        this.facultyUpdateForm.get('birth_Date').setValue(this.facultyInfo.birth_Date.toLocaleString('yyyy/MM/dd').slice(0, 10));
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }



  /**
  * This method gets all the departments and puts then into the
  * array.
  * 
  * Author: Darcy Brown
  * Date: January 29th
  */
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
        for (let x = 0; x < this.depts.length; x++) {
          if (this.depts[x].dept_Name === "Administration") {
            this.depts.splice(x, 1);
          }
        }
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public validateControl(controlName: string) {
    if (this.facultyUpdateForm.controls[controlName].invalid && this.facultyUpdateForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.facultyUpdateForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  /**
  * This method assigns all the attributes to their appropriate interfaces before
  * passing them along to the update function.
  * 
  * Author: Darcy Brown
  * Date: January 24th
  */
  public updateFaculty(facultyFormValue) {
    if (this.facultyUpdateForm.valid) {

      let faculty: Faculty = {
        faculty_Id: this.facultyInfo.faculty_Id,
        faculty_Status: facultyFormValue.faculty_Status,
        user_Id: this.facultyInfo.user_Id,

      };

      let user: User = {
        first_Name: facultyFormValue.first_Name,
        last_Name: facultyFormValue.last_Name,
        address: facultyFormValue.address,
        birth_Date: facultyFormValue.birth_Date,
        dept_Id: facultyFormValue.dept_Id,
        eMail: facultyFormValue.eMail,
        type_Code: this.facultyInfo.type_Code,
        user_Id: this.facultyInfo.user_Id,
        start_Date: this.facultyInfo.start_Date,
      };

      this.executeFacultyUpdate(user, faculty);
    }
  }

  public executeDatePicker(event) {
    this.facultyUpdateForm.patchValue({ 'birth_Date': event });
  }

  public executeDatePickerStartDate(event) {
    this.facultyUpdateForm.patchValue({ 'start_Date': event });
  }

  redirectToFacultyList() {
    this.router.navigate(['/faculty/list']);
  }

  /**
  * This method performs the update. it accepts the User and Faculty and performs
  * both updates to both tables.
  * 
  * Author: Darcy Brown
  * Date: January 29th
  *
  * @param user
  * @param student
  */
  private executeFacultyUpdate(user: User, student: Faculty) {

    let apiUrlUser = `api/user/` + this.facultyInfo.user_Id;
    this.repository.update(apiUrlUser, user)
      .subscribe(res => { },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );

    let apiUrlFaculty = `api/faculty/` + this.facultyInfo.faculty_Id;
    this.repository.update(apiUrlFaculty, student)
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
