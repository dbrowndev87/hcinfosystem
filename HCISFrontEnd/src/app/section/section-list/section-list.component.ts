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
  private isLoaded = false;
  private count;
  private faculty: FacultyInfo[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 8
    };

    this.getAllFaculty();
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

  private getAllFaculty() {
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