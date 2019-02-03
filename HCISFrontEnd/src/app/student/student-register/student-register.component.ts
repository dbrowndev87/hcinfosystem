import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';



@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})

export class StudentRegisterComponent implements OnInit, OnDestroy {

  private studentInfo: StudentInfo;
  private enrolledSections: SectionInfo[] = [];

  // Initial Storage of the Sections
  private sections: SectionInfo[] = [];
  // The select table side
  private sectionsSelect: SectionInfo[] = [];
  // The register table side
  private sectionsRegister = [];

  private studentRegisterForm: FormGroup;
  private errorHeader = "";
  private errorMessage = "";
  private isLoaded = false;

  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.getRegisterInfo();
    console.log(this.enrolledSections);
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  /**
   * This is the method that adds the courses to the selected 
   * courses window for regisrtation selection.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
   * @param index
   */
  private addToRegister(index: number) {
    let tempSection: SectionInfo = this.sections[index];
    this.sectionsRegister.push(JSON.parse(JSON.stringify(tempSection)));
    this.sectionsSelect.splice(index, 1);
  }

  /**
   * This is the method that removes the courses from the selected 
   * courses window for regisrtation selection.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
   * @param index
   */
  private removeFromRegister(index: number) {
    let tempSection: SectionInfo = this.sectionsRegister[index];
    this.sectionsRegister.splice(index, 1);
    this.sectionsSelect.push(JSON.parse(JSON.stringify(tempSection)));
  }

  /**
   * This is the validation method that validates the courses selected 
   * for regisrtation selection.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
   */
  private validateRegistration() {


    // Already registered for 8
    if (this.enrolledSections.length === 8) {
      this.errorHeader = "Maximum Courses";
      this.errorMessage = "You have already registered for the Maximum amount of courses.";
      $('#errorModal').modal();

      // Between 4 and 8 when registering
    } else if (this.sectionsRegister.length + this.enrolledSections.length >= 4 &&
      this.sectionsRegister.length + this.enrolledSections.length <= 8) {

      // Check for duplicate courses in the time period.
      let valid = true;
      let tempHolder: SectionInfo;

      for (let x = 0; x < this.sectionsRegister.length; x++) {
        tempHolder = this.sectionsRegister[x];

        for (let y = 0; y < this.sectionsRegister.length; y++) {
          if (y !== x) {
            if (tempHolder.course_Id === this.sectionsRegister[y].course_Id) {
              valid = false;
            }
          }
        }
      }

      if (valid) {
        // If valid continue
        this.registerCourses();

      } else {
        // Duplicate error
        this.errorHeader = "Duplicate Courses";
        this.errorMessage = "Duplicate courses chosen!\n you may only take a course once in a given time period.";
        $('#errorModal').modal();
      }
    } else {
      // Quantity error
      this.errorHeader = "Invalid Quantity";
      this.errorMessage = "Register to a minimum of 4 and a maximum of 8.";
      $('#errorModal').modal();
    }
  }



  // TODO: ADD REMOVAL OF VACANCY'S ON REGISTER
  // TODO: IMPLEMENT SEMESTER

  /**
   * This is the register method which does all the actions involved
   * with completing the registration.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
   * @param index
   */
  private registerCourses() {
    let enrollmentByIdUrl = `api/enrollment`;
    let counter = 0;

    this.sectionsRegister.forEach(sectioninfo => {
      let tempEnroll: Enrollment = {
        course_Status: "Registered",
        enrollment_Id: 0,
        grade: 0,
        section_Id: sectioninfo.section_Id,
        student_Id: this.studentInfo.student_Id
      };

      // Create department
      let apiUrl = 'api/enrollment';
      this.subscriptions.push(this.repository.create(apiUrl, tempEnroll)
        .subscribe(res => {
          counter++;
          if (counter === this.sectionsRegister.length) {
            $('#successModal').modal();
          }
        },
          // User create error
          (error => {
            this.errorHandler.handleError(error);
            this.errorMessage = "Unable to access API";
          })
        ));


    });
  }


  redirectToHome() {
    this.router.navigate(['/home']);
  }


  /**
   * This method is alot of API calls and loops that gather and sort through
   * the information about the courses available, the courses the student
   * is already registered for or duplicate courses before subscribing to it
   * for the view.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
  */
  private getRegisterInfo() {

    /************************
    * Get student Info
    ************************/
    let apiAddressStudentInfo = "api/studentinfo/" + sessionStorage.getItem("studentId");
    this.subscriptions.push(this.repository.getData(apiAddressStudentInfo)
      .subscribe(studentInfo => {

        // assign student info
        this.studentInfo = studentInfo as StudentInfo;
        // console.log(this.studentInfo);
        this.getStudentSections();
      })),
      // get student info error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }


  private getStudentSections() {

    /************************************
     * Get SectionInfo
    ***********************************/
    let apiAddressSectionInfo = "api/enrollment/student/" + this.studentInfo.student_Id;
    this.subscriptions.push(this.repository.getData(apiAddressSectionInfo)
      .subscribe(sectioninfo => {
        this.enrolledSections = sectioninfo as SectionInfo[];

        this.getAllSectionsInfo(this.enrolledSections);

      })),
      // get Enrollments error
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = "Unable to access API";
      };
  }


  private getAllSectionsInfo(studentSections: SectionInfo[]) {
    /************************************
    * Get Sections
    ***********************************/
    let apiAddressSectionsInfo = "api/section/courseinfo/";
    this.subscriptions.push(this.repository.getData(apiAddressSectionsInfo)
      .subscribe(sectionsinfo => {

        this.sections = sectionsinfo as SectionInfo[];
        this.sectionsSelect = sectionsinfo as SectionInfo[];
        // console.log(tempSections);


        this.isLoaded = true;


        this.getCourses(this.sectionsSelect, studentSections);
      },
        // get Sections error
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }));
  }


  private getCourses(tempSections: SectionInfo[], studentSections: SectionInfo[]) {

    studentSections.forEach(sectionInfo => {
      for (let x = 0; x < tempSections.length; x++) {
        if (sectionInfo.section_Id === tempSections[x].section_Id) {
          tempSections.splice(x, 1);
        }
      }
    });
    this.sections = this.sectionsSelect;
  }

}
