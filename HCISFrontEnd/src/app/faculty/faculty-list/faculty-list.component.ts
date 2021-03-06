/**
 * Name: Faculty-List component
 * Description: This is the Faculty List component which has all the code and attributes
 * which pertain to the Faculty List view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Department } from 'src/app/_interfaces/department.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})

export class FacultyListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<FacultyInfo> = new Subject<FacultyInfo>();

  public facultysInfo: FacultyInfo[];
  public errorMessage: String = "";
  public depts: Department[];
  public isLoaded = false;

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllFacultysInfo();
    this.getAllDepartments();
    this.isLoaded = true;
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
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
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.facultysInfo = res as FacultyInfo[];
        this.dtTrigger.next();
      })),
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
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.depts = res as Department[];
      })),
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
