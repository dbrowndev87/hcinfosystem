/**
 * Name: Student Listing Report Component
 * Description: This is the page which generates the report.
 * I build each course into an array with 3 more arrays inside.
 * 1 course, 2 sections, 3- students
 * 
 * Author: Darcy Brown
 * Date: Febuary 5th, 2019
 */

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_interfaces/user.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportIdGenerator } from 'src/app/shared/tools/ridg';
import { Course } from 'src/app/_interfaces/course.model';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Student } from 'src/app/_interfaces/student.model';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { OrderBy } from 'src/app/shared/tools/orderBy';


@Component({
  selector: 'app-student-listing-report',
  templateUrl: './student-listing-report.component.html',
  styleUrls: ['./student-listing-report.component.css']
})

export class StudentListingReportComponent implements OnInit {

  private courses: any[] = new Array();
  public errorMessage: String = "";
  private user: User;
  private id: string;
  private isLoaded = false;
  private semesters = new Semesters();
  private counter = 0;
  private orderBy = new OrderBy();

  private students: any[] = new Array();
  private sections: any[] = [];

  private reportId = "";
  private reportDate;
  private reportFor = "";


  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];

  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private reportIDGen: ReportIdGenerator
  ) { }

  ngOnInit() {
    this.getUser();
    this.id = this.activeatedRoute.snapshot.params['id'];
    this.reportDate = this.semesters.getTodaysDate();
    this.reportId = this.reportIDGen.generateId('SL');

    if (this.id === '0') {
      this.getAllCourses();
    } else {
      this.getCourseById();
    }
  }

  public getCourseById() {
    let apiAddress = "api/course/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.courses[0] = res as Course;
        // console.log(this.courses);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }).add(() => {
          // Pass the courses on to get the sections.
          this.getSections(this.courses);
        }));
  }


  private getAllCourses() {
    let apiAddress = "api/course";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        let courses = res as Course[];

        // for each course create an array, push the course to it then
        // push that array to this.courses.
        courses.forEach(course => {
          let tempArray: any[] = new Array();
          tempArray.push(course);
          this.courses.push(tempArray);
        });

        // console.log(this.courses);

        // Pass the courses on to get the sections.
        this.getSections(courses);
        this.courses = courses;

      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;
        }));
  }


  /**
   * Gets all the sections as SectionInfo objects.
   * @param courses
   */
  private getSections(courses: any[]) {

    let apiAddress = "api/section/courseInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {

        let sections: SectionInfo[] = [];
        let tempSections: any[] = [];
        sections = res as SectionInfo[];

        /**
         * For each of the courses create a temporary array push the sections
         * that belong to that course to the 1 index of the index of that
         * course in the courses array
         */
        for (let x = 0; x < courses.length; x++) {
          let tempArray: any[] = [];
          courses[x]['sections'] = tempArray;

          for (let y = 0; y < sections.length; y++) {
            if (courses[x].course_Id === sections[y].course_Id) {
              courses[x]['sections'].push(sections[y]);
            }
          }

        }
        // console.log(courses);
        this.sections = tempSections;
        // console.log(this.sections);

        // If you turn up no results for sections just call isLoaded here
        if (this.courses.length <= 1 || this.sections.length <= 0) {
          this.isLoaded = true;
        }

      }).add(() => {

        // for each sections add a student JSON object
        for (let x = 0; x < this.courses.length; x++) {
          for (let y = 0; y < this.courses[x]['sections'].length; y++) {
            let tempArray: any[] = [];
            this.courses[x]['sections'][y]['students'] = tempArray;

            // If the sections length is greater than zero pass in the avriables needed to continue.
            if (this.courses[x]['sections'].length > 0) {
              this.getStudentInfoBySection(this.courses[x]['sections'][y].section_Id, this.courses[x]['sections'][y].designation, x, y);
            }
          }
        }
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  /**
   * Get the user information.
   */
  private getUser() {
    let apiAddress = "api/user/" + sessionStorage.getItem('userId');
    this.subscriptions.push(this.repository.getData(apiAddress)

      .subscribe(res => {
        this.user = res as User;
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  /**
   * Get the student information using all the passed in variables from above.
   * 
   * @param section_Id
   * @param designation 
   * @param x 
   * @param y 
   */
  private getStudentInfoBySection(section_Id, designation, x, y) {
    let apiAddress = "api/studentInfo/section/" + section_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let students: StudentInfo[] = res as StudentInfo[];
        let tempArray: any[] = new Array();

        // Order students by Last Name.
        this.orderBy.transform(students, 'first_Name');


        // for each student push them to the students JSON object.
        for (let z = 0; z < students.length; z++) {
          this.courses[x]['sections'][y]['students'].push(students[z]);
        }

        // console.log(this.courses);

      }).add(() => {
        this.counter++;
        console.log(this.courses)
        // If we have finished all of them set isLoaded to true
        if (this.counter = this.courses.length) {
          this.isLoaded = true;
        }
      })),

      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/studentlisting']);
  }


}
