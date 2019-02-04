import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { TransactionIdGenerator } from 'src/app/shared/tools/tidg';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Student } from 'src/app/_interfaces/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { Section } from 'src/app/_interfaces/section.model';

@Component({
  selector: 'app-faculty-grades',
  templateUrl: './faculty-grades.component.html',
  styleUrls: ['./faculty-grades.component.css']
})
export class FacultyGradesComponent implements OnInit {

  public errorMessage = '';
  public studentInfo: StudentInfo;
  public student: Student;
  public sectionId: number;
  public students: StudentInfo[];
  public sections: Section[];
  public studentGradesForm: FormGroup;
  private transId: number;
  private isLoaded = false;
  private studentId: number;
  private studentEnrollment: Enrollment;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private tidg: TransactionIdGenerator,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.studentId = this.activeRoute.snapshot.params['studentId'];

    this.sectionId = this.activeRoute.snapshot.params['sectionId'];

    this.getEnrollmentInfo(this.studentId, this.sectionId);

    this.studentGradesForm = new FormGroup({
      grade: new FormControl('', [Validators.required]),
      course_Status: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    });

    // This is gets the students information and student
    // table object.

    this.isLoaded = true;
  }

  redirectToFacultyHome() {
    this.router.navigate(['/faculty/home']);
  }

  private getEnrollmentInfo(studentId, sectionId) {

    console.log("Hello");
    let apiAddress = "api/enrollment/section/student/" + studentId + " /" + sectionId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(enrollment => {

        // get student table info
        this.studentEnrollment = enrollment as Enrollment;
        this.studentGradesForm.patchValue(this.studentEnrollment);

        // get the full student Information with the id
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
          this.isLoaded = true;
        }));
  }

  public validateControl(controlName: string) {
    if (this.studentGradesForm.controls[controlName].invalid && this.studentGradesForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }
  public hasError(controlName: string, errorName: string) {
    if (this.studentGradesForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }

  public updateGrade(gradesForm) {
    if (this.studentGradesForm.valid) {

      let enrollment: Enrollment = {
        student_Id: this.studentEnrollment.student_Id,
        grade: gradesForm.grade,
        course_Status: gradesForm.course_Status,
        enrollment_Id: this.studentEnrollment.enrollment_Id,
        section_Id: this.sectionId
      };
      console.log(enrollment);

      this.executeUpdateGrade(enrollment);
    }

  }
  private executeUpdateGrade(enrollment: Enrollment) {

    let apiUrlEnrollment = `api/enrollment/` + enrollment.student_Id;
    this.subscriptions.push(this.repository.update(apiUrlEnrollment, enrollment)
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
