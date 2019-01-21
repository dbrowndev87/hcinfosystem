import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/_interfaces/userlogin.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlogin-list',
  templateUrl: './userlogin-list.component.html',
  styleUrls: ['./userlogin-list.component.css']
})
export class UserloginListComponent implements OnInit {


  public userLogins: UserLogin[];
  public errorMessage: String = "";
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUserLogins();
  }

  public getAllUserLogins() {
    let apiAddress = "api/userlogin";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.userLogins = res as UserLogin[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public redirectToUpdatePage(username) {
    let updateUrl = `/userlogin/update/${username}`;
    this.router.navigate([updateUrl]);
  }



}
