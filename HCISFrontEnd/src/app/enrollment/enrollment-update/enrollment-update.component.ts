import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-enrollment-update',
  templateUrl: './enrollment-update.component.html',
  styleUrls: ['./enrollment-update.component.css']
})

export class EnrollmentUpdateComponent implements OnInit, OnDestroy {

  public errorMessage = "";
  private enrollement: Enrollment;
  private studentInfo: StudentInfo;
  public enrollmentUpdateForm: FormGroup;
  private updateId: number;
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.enrollmentUpdateForm = new FormGroup({
      course_Status: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required, Validators.max(100)]),
    });

    this.updateId = this.activeRoute.snapshot.params['id'];
    this.getEnrollment();

  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  // Patch course to form.
  private getEnrollment() {

    let enrollmentByIdUrl = `api/enrollment/` + this.updateId;

    // get the course data and patch
    this.subscriptions.push(this.repository.getData(enrollmentByIdUrl)
      .subscribe(enrollment => {
        this.enrollement = enrollment as Enrollment;
        this.enrollmentUpdateForm.patchValue(this.enrollement);

        let studentInfoUrl = `api/studentinfo/` + this.enrollement.student_Id;

        // get the course data and patch
        this.subscriptions.push(this.repository.getData(studentInfoUrl)
          .subscribe(studentinfo => {
            this.studentInfo = studentinfo as StudentInfo;
            this.isLoaded = true;
          },
            (error) => {
              this.errorHandler.handleError(error);
              this.errorMessage = "Unable to access API";
            }));
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }));
  }


  public validateControl(controlName: string) {
    if (this.enrollmentUpdateForm.controls[controlName].invalid && this.enrollmentUpdateForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.enrollmentUpdateForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public updateEnrollment(enrollmentUpdateFormValue) {
    if (this.enrollmentUpdateForm.valid) {
      this.executeEnrollmentUpdate(enrollmentUpdateFormValue);
    }
  }

  private executeEnrollmentUpdate(enrollmentUpdateFormValue) {


    this.enrollement.course_Status = enrollmentUpdateFormValue.course_Status;
    this.enrollement.grade = enrollmentUpdateFormValue.grade;

    let apiUrl = `api/enrollment/` + this.updateId;
    this.repository.update(apiUrl, this.enrollement)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );
  }

  public redirectToEnrollmentList() {
    this.router.navigate(['/enrollment/list']);
  }
}

