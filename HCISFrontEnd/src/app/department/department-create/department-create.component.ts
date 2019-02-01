import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Section } from 'src/app/_interfaces/section.model';
import { Department } from "src/app/_interfaces/department.model";


@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  public errorMessage = "";
  private userType: number;
  public departmentForm: FormGroup;
  public departments: Department[];
  private isLoaded = false;

  @ViewChild('dCode') dCode: ElementRef;


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.departmentForm = new FormGroup({
      dept_Name: new FormControl('', [Validators.required, Validators.maxLength(140)])
    });

    this.userType = parseInt(sessionStorage.getItem('typeCode'), 0);
    this.getAllDepartments();

  }

  public validateControl(controlName: string) {
    if (this.departmentForm.controls[controlName].invalid && this.departmentForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.departments = res as Department[];
        this.isLoaded = true;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }


  public hasError(controlName: string, errorName: string) {
    if (this.departmentForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public createDepartment(departmentFormValue) {
    if (this.departmentForm.valid) {
      this.executeDepartmentCreation(departmentFormValue);
    }
  }


  private executeDepartmentCreation(departmentFormValue) {

    // Make a section interface.
    let dept: Department = {
      dept_Id: 0,
      dept_Name: departmentFormValue.dept_Name,
    };
    // Create department
    let apiUrl = 'api/department';
    this.repository.create(apiUrl, dept)
      .subscribe(res => {
        $('#successModal').modal();
      },
        // User create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );
  }

  public redirectToDepartmentList() {
    this.router.navigate(['/department/list']);
  }

}

