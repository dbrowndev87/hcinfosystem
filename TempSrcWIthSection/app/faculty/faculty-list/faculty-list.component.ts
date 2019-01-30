/**
 * Name: Faculty-List component
 * Description: This is the Faculty List component which has all the code and attributes
 * which pertain to the Faculty List view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  public facultysInfo: FacultyInfo[];
  public errorMessage: String = "";
  private depts: Department[];
  private isLoaded = false;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllFacultysInfo();
    this.getAllDepartments();
  }

  /**
* This method gets all the Faculty Info data and assings it to an array
* for use.
* 
* Author: Darcy Brown
* Date: January 29th
*/
  public getAllFacultysInfo() {
    let apiAddress = "api/facultyinfo/";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.facultysInfo = res as FacultyInfo[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  /**
 * This method gets all the department data and assings it to an array
 * for use.
 * 
 * Author: Darcy Brown
 * Date: January 24th
 */
  public getAllDepartments() {
    let apiAddress = "api/department";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
        this.isLoaded = true;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/faculty/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
