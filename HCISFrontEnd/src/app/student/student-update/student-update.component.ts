/**
 * Name: Student-Update Component
 * Description: This is the Student Update component which has all the functions and attributes
 * which pertain to the Student Update view and rocess.
 * 
 * Author: Darcy Brown
 * Date: January 29th, 2019
 */
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Student } from 'src/app/_interfaces/student.model';
import { Department } from 'src/app/_interfaces/department.model';
import { User } from 'src/app/_interfaces/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})

export class StudentUpdateComponent implements OnInit, OnDestroy {

  public errorMessage = "";
  public studentUpdateForm: FormGroup;
  private studentInfo: StudentInfo;
  private depts: Department[];
  private student: Student;
  private studentId: number;
  private isLoaded = false;
  @ViewChild('sStatus') private sStatus: ElementRef;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.studentUpdateForm = new FormGroup({
      first_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      last_Name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(140)]),
      birth_Date: new FormControl('', [Validators.required]),
      eMail: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      dept_Id: new FormControl('', [Validators.required]),
      student_Status: new FormControl(''),
      amount_Owing: new FormControl('', [Validators.max(999999)]),
    });

    // Get the ID from the URL
    this.studentId = this.activeRoute.snapshot.params['id'];

    // Get student Information
    this.getStudentInfo();
    this.getAllDepartments();
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * This method gets student information pack and puts then into the
   * for display in view.
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  public getStudentInfo() {
    let apiAddress = "api/studentinfo/";
    this.subscriptions.push(this.repository.getData(apiAddress + this.studentId)
      .subscribe(studentinfo => {

        this.studentInfo = studentinfo as StudentInfo;
        this.studentUpdateForm.patchValue(this.studentInfo);
        this.studentUpdateForm.get('birth_Date').setValue(this.studentInfo.birth_Date.toLocaleString('yyyy/mm/dd').slice(0, 10));
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
  * Date: January 24th
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
    if (this.studentUpdateForm.controls[controlName].invalid && this.studentUpdateForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.studentUpdateForm.controls[controlName].hasError(errorName)) {
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
  public updateStudent(studentFormValue) {
    if (this.studentUpdateForm.valid) {

      let student: Student = {
        user_id: this.studentInfo.user_Id,
        gpa: this.studentInfo.gpa,
        amount_Owing: studentFormValue.amount_Owing,
        student_Id: this.studentInfo.student_Id,
        student_Status: studentFormValue.student_Status
      };

      let user: User = {
        first_Name: studentFormValue.first_Name,
        last_Name: studentFormValue.last_Name,
        address: studentFormValue.address,
        birth_Date: studentFormValue.birth_Date,
        dept_Id: studentFormValue.dept_Id,
        eMail: studentFormValue.eMail,
        type_Code: this.studentInfo.type_Code,
        user_Id: this.studentInfo.user_Id
      };

      this.executeStudentUpdate(user, student);
    }
  }

  public executeDatePicker(event) {
    this.studentUpdateForm.patchValue({ 'birth_Date': event });
  }

  redirectToStudentList() {
    this.router.navigate(['/student/list']);
  }

  /**
  * This method performs the update. it accepts the User and Student and performs
  * both updates to both tables.
  * 
  * Author: Darcy Brown
  * Date: January 27th
  *
  * @param user
  * @param student
  */
  private executeStudentUpdate(user: User, student: Student) {

    let apiUrlUser = `api/user/` + this.studentInfo.user_Id;
    this.subscriptions.push(this.repository.update(apiUrlUser, user)
      .subscribe(res => { },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));

    let apiUrlStudent = `api/student/` + this.studentInfo.student_Id;
    this.subscriptions.push(this.repository.update(apiUrlStudent, student)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));
  }

}
