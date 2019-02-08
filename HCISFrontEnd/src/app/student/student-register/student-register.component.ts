/**
 * Name: Student Register Component
 * Description: This is the student register component which allows the student to 
 * pregister for their courses for the semester.
 * 
 * Author: Darcy Brown
 * Date: January 1st, 2019
 */
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Router } from '@angular/router';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';
import { Section } from 'src/app/_interfaces/section.model';
import { map } from 'rxjs/operators';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Student } from 'src/app/_interfaces/student.model';



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
  private sectionsRegister = [] = [];

  private studentRegisterForm: FormGroup;
  private errorHeader = "";
  private errorMessage = "";
  private isLoaded = false;
  private droppedCourses = 0;
  private enrollmentCount = 0;
  private semesters = new Semesters();
  private nextSemester: string;
  private rotateButtons: boolean;

  public innerWidth: any;


  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private router: Router,
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.rotateButt();

    this.getRegisterInfo();
    // Declare next Semester
    this.nextSemester = this.semesters.getNextSemester().nextSemester;
  }

  // Destroy subscriptions when done.
  ngOnDestroy(): void {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.rotateButt();
  }

  private rotateButt() {
    if (this.innerWidth < 990) {
      this.rotateButtons = true;
    } else if (this.innerWidth > 990) {
      this.rotateButtons = false;
    }
    // console.log(this.rotateButtons);
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



  /**
   * This is the register method which does all the actions involved
   * with completing the registration.
   * 
   * Author: Darcy Brown
   * Date: Feb 2nd, 2019
   * @param index
   */
  private registerCourses() {
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


      // Update the enrollment to dropped
      let apiUrlSection = `api/section/` + sectioninfo.section_Id;

      // set the section object and add the vacancy back
      let tempSection: Section = {
        course_Id: sectioninfo.course_Id,
        designation: sectioninfo.designation,
        end_Date: sectioninfo.end_Date,
        faculty_Id: sectioninfo.faculty_Id,
        section_Id: sectioninfo.section_Id,
        semester: sectioninfo.semester,
        start_Date: sectioninfo.start_Date,
        vacancy: (sectioninfo.vacancy - 1)
      };


      // Update the section object
      this.subscriptions.push(this.repository.update(apiUrlSection, tempSection)
        .subscribe(res => { },
          (error => {
            this.errorHandler.handleError(error);
            this.errorMessage = "Unable to access API";
          })
        ));
    });



    // Update the enrollment to dropped
    let apiUrlStudent = `api/student/` + this.studentInfo.student_Id;
    // set the student object and add the vacancy back
    let tempStudent: Student = {
      amount_Owing: this.studentInfo.amount_Owing += (this.sectionsRegister.length * 1000),
      gpa: this.studentInfo.gpa,
      student_Id: this.studentInfo.student_Id,
      student_Status: this.studentInfo.student_Status,
      user_id: this.studentInfo.user_Id
    };

    // Update the section object
    this.subscriptions.push(this.repository.update(apiUrlStudent, tempStudent)
      .subscribe(res => { },
        (error => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        })
      ));



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

        // Make an index for the forEach;
        let index = 0;
        this.enrolledSections.forEach(enrollment => {

          // This loop filters out all the dropped courses a student may have.
          let apiAddressEnrollments = "api/enrollment/section/" + enrollment.section_Id;
          this.subscriptions.push(this.repository.getData(apiAddressEnrollments).pipe(
            map(studentEnrollments => {

              let tempEnrollments = studentEnrollments as Enrollment[];

              // get the enrollment object
              tempEnrollments.forEach(temp => {
                if (temp.section_Id === enrollment.section_Id &&
                  temp.course_Status !== "Dropped") {
                  this.enrollmentCount++;
                }

                if (temp.section_Id === enrollment.section_Id &&
                  temp.course_Status === "Dropped") {
                  this.droppedCourses++;
                }
              });

              // Increate the Index
              index++;

            })).subscribe()),
            // tslint:disable-next-line: no-unused-expression
            (error) => {
              this.errorHandler.handleError(error);
              this.errorMessage = "Unable to access API";
            };

        });

        // Continue with the process
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
      .subscribe((sectionsinfo: SectionInfo[]) => {

        this.sections = sectionsinfo as SectionInfo[];

        // Grab the courses for the next semester.
        sectionsinfo.forEach(sections => {

          // FIXME: Need to add vacancy check  here ( && sections.vacancy > 0) when
          // done testing and have more courses.

          if (sections.semester === this.nextSemester) {
            this.sectionsSelect.push(sections);
          }
        });

        // console.log(tempSections);
        // Remove all your currently enrolled courses
        this.getCourses(this.sectionsSelect, studentSections);
      },
        // get Sections error
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = "Unable to access API";
        }));
  }

  /**
   * This method filters out the courses that the student already has from
   * the rest of the list.
   * 
   * @author: Darcy Brown
   * @since Febuary 2nd, 2019
   * @param tempSections 
   * @param studentSections 
   */
  private getCourses(tempSections: SectionInfo[], studentSections: SectionInfo[]) {
    studentSections.forEach(sectionInfo => {
      for (let x = 0; x < tempSections.length; x++) {
        if (sectionInfo.section_Id === tempSections[x].section_Id) {
          tempSections.splice(x, 1);
        }
      }
    });
    this.sections = this.sectionsSelect;

    // set fully loaded
    this.isLoaded = true;
  }
}
