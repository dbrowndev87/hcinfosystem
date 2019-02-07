import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStudentReportComponent } from './bill-student-report.component';

describe('BillStudentReportComponent', () => {
  let component: BillStudentReportComponent;
  let fixture: ComponentFixture<BillStudentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillStudentReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillStudentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
