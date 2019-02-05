import { Course } from 'src/app/_interfaces/course.model';
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-catalogue',
  templateUrl: './course-catalogue.component.html',
  styleUrls: ['./course-catalogue.component.css']
})
export class CourseCatalogueComponent implements OnInit {

  public courses: Course[];
  public errorMessage: String = "";
  private courseCatalogueForm: FormGroup;
  private depts: Department[];
  private id: number;
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.courseCatalogueForm = new FormGroup({
      dept_Id: new FormControl('', [Validators.required])
    });

    this.getAllDepartments();
    this.isLoaded = true;
  }


  private getAllDepartments() {

    let apiAddress = "api/department/";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];

        for (let x = 0; x < this.depts.length; x++) {
          if (this.depts[x].dept_Id === 1) {
            this.depts.splice(x, 1);
          }
        }

      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.isLoaded = false;
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public validateControl(controlName: string) {
    if (this.courseCatalogueForm.controls[controlName].invalid && this.courseCatalogueForm.controls[controlName].touched) {
      return true;
    }

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.courseCatalogueForm.controls[controlName].hasError(errorName)) {
      return true;
    }

    return false;
  }


  private redirectToReport(formValue) {
    this.router.navigate(['/reports/coursecatalogue/report/' + formValue.dept_Id]);
  }

  private redirectToAllReport(id) {
    this.router.navigate(['/reports/coursecatalogue/report/' + id]);
  }

}
