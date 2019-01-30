import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Section } from 'src/app/_interfaces/section.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Course } from 'src/app/_interfaces/course.model';


@Component({
  selector: 'app-section-update',
  templateUrl: './section-update.component.html',
  styleUrls: ['./section-update.component.css']
})

export class SectionUpdateComponent implements OnInit {

  public errorMessage = "";
  public sectionForm: FormGroup;
  private section: Section;
  private userType: number;
  private isLoaded = false;
  public designations = new Array("A", "B", "C", "L");
  public courses: Course[];
  @ViewChild('dCode') private dCode: ElementRef;


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sectionForm = new FormGroup({
        section_Id: new FormControl('', [Validators.required]),
        faculty_Id: new FormControl('', [Validators.required, Validators.maxLength(6)]),
        start_Date: new FormControl('', [Validators.required]),
        end_Date: new FormControl('', [Validators.required]),
        designation: new FormControl('', [Validators.required, Validators.maxLength(1)]),
        semester: new FormControl('', [Validators.required, Validators.maxLength(10)]),
        course_Id: new FormControl('', [Validators.required]),
        vacancy: new FormControl('', [Validators.required, Validators.maxLength(3)]),
    });

    this.userType = parseInt(sessionStorage.getItem('typeCode'), 0);
    this.getsectionById();
    this.getAllCourses();
  }

  public getAllCourses() {
    let apiAddress = "api/course";
    this.repository.getData(apiAddress)
      .subscribe(res => {
        this.courses = res as Course[];
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }
  // Patch section to form.
  private getsectionById() {
    let id: string = this.activeRoute.snapshot.params['id'];
    let sectionByIdUrl = `api/section/${id}`;

    // get the section data and patch
    this.repository.getData(sectionByIdUrl)
      .subscribe(res => {
        this.section = res as Section;
        this.sectionForm.patchValue(this.section);
        this.isLoaded = true;

      },
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        });
  }

  public validateControl(controlName: string) {
    if (this.sectionForm.controls[controlName].invalid && this.sectionForm.controls[controlName].touched) {
      return true;
    }
    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.sectionForm.controls[controlName].hasError(errorName)) {
      return true;
    }
    return false;
  }

  public executeStartDatePicker(event) {
    this.sectionForm.patchValue({ 'start_Date': event });
  }

  public executeEndDatePicker(event) {
    this.sectionForm.patchValue({ 'end_Date': event });
  }
  public updateSection(sectionFromValue) {
    if (this.sectionForm.valid) {
      this.executeSectionUpdate(sectionFromValue);
    }
  }

  private executeSectionUpdate(sectionFormValue) {

    this.section.section_Id = parseInt(sectionFormValue.section_Id, 0);
    this.section.course_Id = sectionFormValue.course_Id;
    this.section.designation = sectionFormValue.designation;
    this.section.end_Date = sectionFormValue.end_Date;
    this.section.vacancy = parseInt(sectionFormValue.vacancy, 0);
    this.section.start_Date = sectionFormValue.start_Date;
    this.section.semester = sectionFormValue.semester;
    this.section.faculty_Id = parseInt(sectionFormValue.faculty_Id, 0);

    console.log(this.section);

    let updateId = this.section.section_Id;

    let apiUrl = `api/section/${updateId}`;
    this.repository.update(apiUrl, this.section)
      .subscribe(res => {
        $('#successModal').modal();
      },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      );
  }
  public redirectToSectionList() {
    this.router.navigate(['/section/list']);
  }
}
