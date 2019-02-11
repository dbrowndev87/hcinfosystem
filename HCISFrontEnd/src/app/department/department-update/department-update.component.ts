/**
 * Name: department Update Component
 * Description: This is the department Update component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 26th, 2019
 */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})

export class DepartmentUpdateComponent implements OnInit {

  public errorMessage = "";
  public departmentForm: FormGroup;
  public department: Department;
  public userType: number;
  public isLoaded = false;
  @ViewChild('dCode') public dCode: ElementRef;


  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.departmentForm = new FormGroup({
      dept_Id: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      dept_Name: new FormControl('', [Validators.required, Validators.maxLength(140)]),
    });

    this.userType = parseInt(sessionStorage.getItem('typeCode'), 0);
    // get all departments.
    this.getdepartmentById();
  }

  // Patch department to form.
  public getdepartmentById() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let departmentByIdUrl = `api/department/${id}`;

    // get the department data and patch
    this.repository.getData(departmentByIdUrl)
      .subscribe(res => {
        this.department = res as Department;
        this.departmentForm.patchValue(this.department);
        this.isLoaded = true;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        });
  }

  public validateControl(controlName: string) {
    if (this.departmentForm.controls[controlName].invalid && this.departmentForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.departmentForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public updateDepartment(departmentFromValue) {
    if (this.departmentForm.valid) {
      this.executeDepartmentUpdate(departmentFromValue);
    }
  }

  public executeDepartmentUpdate(departmentFormValue) {
    let updateId = this.department.dept_Id;

    this.department.dept_Id = departmentFormValue.dept_Id;
    this.department.dept_Name = departmentFormValue.dept_Name;

    let apiUrl = `api/department/${updateId}`;
    console.log(this.department);
    this.repository.update(apiUrl, this.department)
      .subscribe(res => {
        $('#successModal').modal();
      },
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
