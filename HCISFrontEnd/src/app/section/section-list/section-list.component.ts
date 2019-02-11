import { Component, OnInit, OnDestroy } from '@angular/core';
import { Section } from 'src/app/_interfaces/section.model';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { deepStrictEqual } from 'assert';
import { Subject, Subscription } from 'rxjs';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Faculty } from 'src/app/_interfaces/faculty.model';
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';

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
  public isLoaded = false;
  public count;
  public faculty: FacultyInfo[] = [];

  constructor(
    public repository: RepositoryService,
    public errorHandler: ErrorHandlerService,
    public router: Router) {

    this.getAllFaculty();

  }

  // Array for all the subscriptions
  public subscriptions: Subscription[] = [];

  ngOnInit() {



    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.getAllSections();
    this.isLoaded = true;
  }



  public getAllSections() {
    let apiAddress = "api/section/courseInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(sections => {

        this.sections = sections as SectionInfo[];
        this.dtTrigger.next();



      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }).add(() => {

        }));
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();

    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public getAllFaculty() {
    let apiAddress = "api/facultyInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(faculty => {

        this.faculty = faculty as FacultyInfo[];
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }).add(() => {

        }));
  }

  public redirectToUpdatePage(id) {
    let updateUrl = `/section/update/${id}`;
    this.router.navigate([updateUrl]);
  }
}