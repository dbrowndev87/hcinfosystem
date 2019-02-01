/**
 * Name: Student-List Component
 * Description: This is the Student List component which has all the functions and attributes
 * which pertain to the Student-List view, and creation process.
 * 
 * Author: Darcy Brown
 * Date: January 29th, 2019
 */
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<StudentInfo> = new Subject();

  public studentsInfo: StudentInfo[];
  public errorMessage: String = "";
  private depts: Department[];
  private isLoaded = false;

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

    this.getAllStudentsInfo();
    this.getAllDepartments();
  }

  public getAllStudentsInfo() {
    let apiAddress = "api/studentinfo/";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.studentsInfo = res as StudentInfo[];
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
    let updateUrl = `/student/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}