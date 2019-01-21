import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: User[];
  public errorMessage: String = "";
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

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

  public redirectToUpdatePage(id) {
    let updateUrl = `/user/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
