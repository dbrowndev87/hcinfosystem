import { Component, OnInit } from '@angular/core';
import { SectionInfo } from 'src/app/_interfaces/sectionInfo.model';
import { Student } from 'src/app/_interfaces/student.model';
import { Semesters } from 'src/app/shared/tools/semesters';
import { Subscription } from 'rxjs';
import { RepositoryService } from 'src/app/shared/services/repository.service';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/_interfaces/transaction.model';

@Component({
  selector: 'app-bill-student-report',
  templateUrl: './bill-student-report.component.html',
  styleUrls: ['./bill-student-report.component.css']
})
export class BillStudentReportComponent implements OnInit {

  public courses: any[] = [];
  public errorMessage: String = "";
  private sections: SectionInfo[];
  private transactions: Transaction[] = [];
  private student: Student;
  private id: number;
  private isLoaded = false;
  private typeCode;
  private semesters = new Semesters();

  private totals: any[] = [
    { "type": "Total Accumulative Enrollments", "total": 0 },
    { "type": "Total Amount Paid", "total": 0 },
    { "type": "Total Owing", "total": 0 }
  ];

  private counter = 0;
  private transcriptDate;


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

    // if a student is logged in and tries to access anything other
    // than their own transcript, send them to 404.
    if (this.typeCode === 3 && sessionStorage.getItem('studentId')) {
      let urlParam = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
      let studentId = parseInt(sessionStorage.getItem('studentId'), 0);

      if (urlParam !== studentId) {
        this.router.navigate(['/404']);
      } else {
        // else load their transcript.
        this.transcriptDate = this.semesters.getTodaysDate();
        this.id = parseInt(sessionStorage.getItem('studentId'), 0);
        this.getStudent();
      }
    } else {
      // Admin load transcripts.
      this.transcriptDate = this.semesters.getTodaysDate();
      this.id = parseInt(this.activeatedRoute.snapshot.params['id'], 0);
      this.getStudent();
    }
  }


  private getStudent() {
    let apiAddress = "api/studentInfo/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.student = res as Student;
        console.log(this.student);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          // get the students sections
          this.getSectionsByStudentId();
        }));
  }

  private getSectionsByStudentId() {
    let apiAddress = "api/enrollment/student/" + this.id;
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        this.sections = res as SectionInfo[];

        for (let x = 0; x < this.sections.length; x++) {
          this.totals[0]['total'] += 1000.00;
        }
        console.log(this.sections);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          this.getTransactions();
        }));
  }

  private getTransactions() {
    let apiAddress = "api/transaction";
    this.subscriptions.push(this.repository.getData(apiAddress)
      .subscribe(res => {
        let tempTransactions = res as Transaction[];

        for (let x = 0; x < tempTransactions.length; x++) {
          if (tempTransactions[x].student_Id === this.id) {
            this.transactions[x] = tempTransactions[x];
            this.totals[1]['total'] += tempTransactions[x].trans_Amount;
          }
        }
        console.log(this.transactions);
      },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          this.errorHandler.handleError(error);
          this.errorMessage = this.errorHandler.errorMessage;

        }).add(() => {
          this.calculate();
          this.isLoaded = true;
        }));
  }

  private calculate() {
    this.totals[2]['total'] = (this.totals[0]['total'] - this.totals[1]['total']);
    console.log(this.totals);
  }

  private backToReportGenerator() {
    this.router.navigate(['/reports/billstudent']);
  }
}
