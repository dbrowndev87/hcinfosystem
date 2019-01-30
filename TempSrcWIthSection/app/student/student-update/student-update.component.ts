
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Student } from 'src/app/_interfaces/student.model';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})

export class StudentUpdateComponent implements OnInit {

  public errorMessage = "";
  public studentUpdateForm: FormGroup;
  private studentInfo: StudentInfo;
  private student: Student;
  private studentId: number;
  private isLoaded = false;
  @ViewChild('sStatus') private sStatus: ElementRef;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {

  }
  ngOnInit() {
    this.studentUpdateForm = new FormGroup({
      student_Status: new FormControl(''),
    });

    // Get the ID from the URL
    this.studentId = this.activeRoute.snapshot.params['id'];

    // Get student Information
    this.getStudentInfo();
    // get Student Object
    this.getStudent();
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
    this.repository.getData(apiAddress + this.studentId)
      .subscribe(studentinfo => {

        this.studentInfo = studentinfo as StudentInfo;
        console.log(this.studentInfo);
        // set laoded to true
        this.isLoaded = true;

      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
        this.isLoaded = true;
      };
  }


  /**
   * This method gets student and puts then into the
   * for display in view.
   * 
   * Author: Darcy Brown
   * Date: January 25th, 2019
   */
  public getStudent() {
    let apiAddress = "api/student/";
    this.repository.getData(apiAddress + this.studentId)
      .subscribe(student => {

        this.student = student as Student;
        this.studentUpdateForm.patchValue(this.student);
        // set laoded to true
        this.isLoaded = true;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
        this.isLoaded = true;
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

  public updateStudent(studentFormValue) {
    if (this.studentUpdateForm.valid) {
      this.executeStudentUpdate(studentFormValue);
    }
  }

  redirectToStudentList() {
    this.router.navigate(['/student/list']);
  }

  /**
  * This method performs the update.
  * 
  * Author: Darcy Brown
  * Date: January 27th
  *
  * @param studentFormValue
  */
  private executeStudentUpdate(studentFormValue) {

    this.student.student_Status = studentFormValue.student_Status;

    let apiUrl = `api/student/` + this.student.student_Id;
    this.repository.update(apiUrl, this.student)
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
