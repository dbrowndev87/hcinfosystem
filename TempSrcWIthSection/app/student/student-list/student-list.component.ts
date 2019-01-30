import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/_interfaces/student.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})

export class StudentListComponent implements OnInit {

  public students: Student[];
  public errorMessage: String = "";
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllStudents();
  }

  public getAllStudents() {
    let apiAddress = "api/student";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.students = res as Student[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/student/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}
