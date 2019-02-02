import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router } from '@angular/router';
import { Section } from 'src/app/_interfaces/section.model';
import { Course } from "src/app/_interfaces/course.model";
import { FacultyInfo } from 'src/app/_interfaces/facultyInfo.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-section-create',
  templateUrl: './section-create.component.html',
  styleUrls: ['./section-create.component.css']
})

export class SectionCreateComponent implements OnInit, OnDestroy {

  public errorMessage = "";
  private userType: number;
  public sectionForm: FormGroup;
  public designations = new Array("A", "B", "C", "L");
  public faculty: FacultyInfo[];
  public courses: Course[];
  private isLoaded = false;
  @ViewChild('dCode') dCode: ElementRef;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sectionForm = new FormGroup({
      faculty_Id: new FormControl('', [Validators.required, Validators.maxLength(6)]),
      start_Date: new FormControl('', [Validators.required]),
      end_Date: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      semester: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      course_Id: new FormControl('', [Validators.required]),
      vacancy: new FormControl('', [Validators.required, Validators.max(100)]),
    });

    this.userType = parseInt(sessionStorage.getItem('typeCode'), 0);
    this.getAllCourses();
    this.getAllFaculty();
    this.isLoaded = true;

  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public validateControl(controlName: string) {
    if (this.sectionForm.controls[controlName].invalid && this.sectionForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  // Execute the Date Picker object.
  public executeStartDatePicker(event) {
    this.sectionForm.patchValue({ 'start_Date': event });
  }

  // Execute the Date Picker object.
  public executeEndDatePicker(event) {
    this.sectionForm.patchValue({ 'end_Date': event });
  }

  public getAllCourses() {
    let apiAddress = "api/course";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.courses = res as Course[];
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public getAllFaculty() {
    let apiAddress = "api/facultyInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.faculty = res as FacultyInfo[];
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }

  public hasError(controlName: string, errorName: string) {
    if (this.sectionForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public createSection(sectionFormValue) {
    if (this.sectionForm.valid) {
      this.executeSectionCreation(sectionFormValue);
    }
  }


  private executeSectionCreation(sectionFormValue) {

    // Make a section interface.
    let section: Section = {
      section_Id: 0,
      faculty_Id: parseInt(sectionFormValue.faculty_Id, 0),
      start_Date: sectionFormValue.start_Date,
      end_Date: sectionFormValue.end_Date,
      designation: sectionFormValue.designation,
      semester: sectionFormValue.semester,
      vacancy: parseInt(sectionFormValue.vacancy, 0),
      course_Id: sectionFormValue.course_Id
    };

    console.log(section);
    // Create section
    let apiUrl = 'api/section';
    this.subscriptions.push(this.repository.create(apiUrl, section)
      .subscribe(res => {
        $('#successModal').modal();
      },
        // User create error
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));
  }

  public redirectToSectionList() {
    this.router.navigate(['/section/list']);
  }

}

