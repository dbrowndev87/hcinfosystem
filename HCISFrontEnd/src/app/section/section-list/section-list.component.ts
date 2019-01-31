import { Component, OnInit } from '@angular/core';
import { Section } from 'src/app/_interfaces/section.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Department } from 'src/app/_interfaces/department.model';
import { deepStrictEqual } from 'assert';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  public sections: Section[];
  public errorMessage: String = "";
  private isLoaded = false;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllSections();
    this.isLoaded = true;
  }

  public getAllSections() {
    let apiAddress = "api/section";
    this.repository.getData(apiAddress)
      .subscribe(sections => {
        this.sections = sections as Section[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/section/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}