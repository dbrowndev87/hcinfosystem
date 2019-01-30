/**
 * Name: Admin List Component
 * Description: This is the Admin List component which has all the attributes
 * and methods pertain to the component.
 * 
 * Author: Darcy Brown
 * Date: January 26th, 2019
 */
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  public users: User[];
  public usersObservable: User[];
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
      .subscribe(observables => {

        // Assign observables
        this.users = observables as User[];

        // Pick out the administration
        for (let x = 0; x < this.users.length; x++) {
          if (this.users[x].type_Code !== 1) {
            this.users.splice(x, x);
          }
        }

        // Set to loaded
        this.isLoaded = true;
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
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
    let updateUrl = `/admin/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
