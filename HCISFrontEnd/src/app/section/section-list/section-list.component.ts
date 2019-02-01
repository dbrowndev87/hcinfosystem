import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from 'src/app/_interfaces/section.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { deepStrictEqual } from 'assert';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Section> = new Subject<Section>();

  public sections: Section[];
  public errorMessage: String = "";
  private isLoaded = false;
  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, private router: Router) { }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllSections();
    this.isLoaded = true;
  }

  public getAllSections() {
    let apiAddress = "api/section";
    this.repository.getData(apiAddress)

      .subscribe(sections => {

        this.sections = sections as Section[];
        this.dtTrigger.next();
        
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  public redirectToUpdatePage(id) {
    let updateUrl = `/section/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}