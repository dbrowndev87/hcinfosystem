/**
 * Name: User-List Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the User-list view and process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/_interfaces/department.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public users: User[];
  public errorMessage: String = "";
  private depts: Department[];
  private isLoaded = false;

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    // Get all users and departments
    this.getAllUsers();
    this.getAllDepartments();
  }

  /**
   * This method gets all the user data and assings it to an array
   * for use.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   */
  public getAllUsers() {
    let apiAddress = "api/user";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.users = res as User[];
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
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  /**
   * Redirect method.
   * 
   * Author: Darcy Brown
   * Date: January 24th
   * @param id 
   */
  public redirectToUpdatePage(id) {
    let updateUrl = `/user/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
