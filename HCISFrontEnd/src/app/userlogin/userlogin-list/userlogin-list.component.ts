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
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/_interfaces/user.model';

@Component({
  selector: 'app-userlogin-list',
  templateUrl: './userlogin-list.component.html',
  styleUrls: ['./userlogin-list.component.css']
})

export class UserloginListComponent implements OnInit, OnDestroy {


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UserLogin> = new Subject<UserLogin>();

  public userLogins: any[] = [];
  public errorMessage: String = "";
  public users: User[] = [];
  public loadingMessage = "Loading";
  public isLoaded = false;
  public outputInfo: any[];
  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];


  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllUserLogins();
    this.isLoaded = true;
  }

  /**
   * Gets all the user logins and associated user information
   * to make it easier for search.
   */
  public getAllUserLogins() {
    let apiAddress = "api/userlogin";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let userLogins = res as UserLogin[];

        // Get the user object associated with the uder logins
        let apiAddressUser = "api/user";
        this.subscriptions.push(this.repository.getData(apiAddressUser)
          .subscribe(res => {
            this.users = res as User[];

            // Loop through and make arrays of userLogin object for that user
            // Pushed to 0 and the first name and last name pushed to 1
            for (let x = 0; x < userLogins.length; x++) {
              let tempArray: any[] = [];
              for (let y = 0; y < this.users.length; y++) {
                if (userLogins[x].user_Id === this.users[y].user_Id) {
                  tempArray[x] = new Array<any>();
                  tempArray[x].push(userLogins[x]);
                  tempArray[x].push({ 'first_Name': this.users[y].first_Name, 'last_Name': this.users[y].last_Name })
                }
              }
              // push it to the user login arra at the index of x
              this.userLogins[x] = tempArray;
            }
            // call the data table trigger
            this.dtTrigger.next();

          },
            // tslint:disable-next-line: no-unused-expression
            (error) => {
              this.errorHandler.handleError(error);
              this.errorMessage = this.errorHandler.errorMessage;
            }));


      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }));
  }


  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public redirectToUpdatePage(username) {
    let updateUrl = `/userlogin/update/${username}`;
    this.router.navigate([updateUrl]);
  }

}
