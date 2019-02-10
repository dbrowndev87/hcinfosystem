import { SectionInfo } from './../../_interfaces/sectionInfo.model';
import { Department } from 'src/app/_interfaces/department.model';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Student } from 'src/app/_interfaces/student.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentInfo } from 'src/app/_interfaces/studentInfo.model';
import { Enrollment } from 'src/app/_interfaces/enrollment.model';

@Component({
  selector: 'app-student-courses-report',
  templateUrl: './student-courses-report.component.html',
  styleUrls: ['./student-courses-report.component.css']
})
export class StudentCoursesReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  private studentInfos: StudentInfo[] = [];
  private enrollmentsByStudentId: Enrollment[] = [];
  private student: Student;
  private id: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();
  private students: any[] = [];
  private department: Department;
  private allSections: SectionInfo[] = [];

  private counter = 0;
  private transcriptDate;
  private semester: any;
  private year: any;
  private dept: number;


  // Array for all the subscriptions
  private subscriptions: Subscription[] = [];


  constructor(
    private repository: RepositoryService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);

    if (this.typeCode !== 1) {
      this.router.navigate(['/404']);
    } else {
      // else load their transcript.
      this.transcriptDate = this.semesters.getTodaysDate();
      this.id = parseInt(sessionStorage.getItem('id'), 0);
      this.semester = this.activeatedRoute.snapshot.params['semester'];
      this.year = parseInt(this.activeatedRoute.snapshot.params['year']);
      this.dept = parseInt(this.activeatedRoute.snapshot.params['deptId']);


      this.getAllSections();

    }
  }
  private getDepartmentById(deptId){
    let apiAddress = "api/department/"+deptId;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.department = res as Department;
        
        this.getStudentsBySemesterYear();
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }
  private getAllSections(){
    let apiAddress = "api/section/courseInfo";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.allSections = res as SectionInfo[];
        this.getDepartmentById(this.dept);
      })),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      };
  }

  private getEnrollmentsByStudentId(id, i) {
    let apiAddress = "api/section/semester/year/student/dept/" + this.semester+"/"+this.year+"/"+id+"/"+this.department.dept_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        
        let enrollmentsByStudentId = res as Enrollment[];
        let tempSections: SectionInfo[] = [];
        this.studentInfos[i]['enrollments'] = [];
        this.studentInfos[i]['sections'] = [];
        
        
        for(let j = 0; j < enrollmentsByStudentId.length; j++){
          this.studentInfos[i]['enrollments'].push(enrollmentsByStudentId[j]); 
          for(let x = 0; x< this.allSections.length; x++){
            if(enrollmentsByStudentId[j].section_Id == this.allSections[x].section_Id){
              this.studentInfos[i]['sections'].push(this.allSections[x]);
            }
          }
        }
        

      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          // get the students sections
          // this.getSectionsBySemesterYear();
        }));
  }

  private getStudentsBySemesterYear() {
    console.log(this.semester+this.year);
    let apiAddress = "api/section/semester/year/dept/" + this.semester + "/" + this.year+ "/" + this.department.dept_Id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        
        this.studentInfos = res as StudentInfo[];
        console.log(this.studentInfos);

        for(let i = 0; i < this.studentInfos.length; i++){
          this.getEnrollmentsByStudentId(this.studentInfos[i].student_Id, i);
          this.counter++;
        }
      this.isLoaded = false;
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          console.log(this.studentInfos);
          if(this.counter == this.studentInfos.length){
            this.isLoaded = true;
          }
          
        }));
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/studentcourses']);
  }
}
