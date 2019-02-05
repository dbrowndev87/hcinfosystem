import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListingReportComponent } from './student-listing-report.component';

describe('StudentListingReportComponent', () => {
  let component: StudentListingReportComponent;
  let fixture: ComponentFixture<StudentListingReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListingReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
