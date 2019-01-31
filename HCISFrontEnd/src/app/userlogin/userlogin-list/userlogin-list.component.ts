/**
 * Name: UserLogin-List Component
 * Description: This is the user create component which has all the code and attributes
 * which pertain to the UserLogin List view
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-userlogin-list',
  templateUrl: './userlogin-list.component.html',
  styleUrls: ['./userlogin-list.component.css']
})

export class UserloginListComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UserLogin> = new Subject();

  public userLogins: UserLogin[];
  public errorMessage: String = "";

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllUserLogins();
  }

  public getAllUserLogins() {
    let apiAddress = "api/userlogin";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.userLogins = res as UserLogin[];
        this.dtTrigger.next();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


  public redirectToUpdatePage(username) {
    let updateUrl = `/userlogin/update/${username}`;
    this.router.navigate([updateUrl]);
  }



}
