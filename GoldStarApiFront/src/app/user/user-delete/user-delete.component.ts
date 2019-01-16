import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  public errorMessage = '';
  public user: User;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getUserById();
  }

  private getUserById() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let userByIdUrl = `api/user/${id}`;

    this.repository.getData(userByIdUrl)
      .subscribe(res => {
        this.user = res as User;
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }

  public redirectToUserList() {
    this.router.navigate(['/user/list']);
  }

  // delete user
  public deleteUser() {
    let deleteUrl = `api/user/${this.user.userid}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {

        // deleye login information
        let deleteUrl = `api/userlogin/deleteuserid/${this.user.userid}`;
        this.repository.delete(deleteUrl)
          .subscribe(res => {
          },
            (error) => {
              this.errorHandler.handleError(error);
              this.errorMessage = this.errorHandler.errorMessage;
            });
        $('#successModal').modal();
      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        });
  }
}
