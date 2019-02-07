import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCoursesReportComponent } from './student-courses-report.component';

describe('StudentCoursesReportComponent', () => {
  let component: StudentCoursesReportComponent;
  let fixture: ComponentFixture<StudentCoursesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCoursesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCoursesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
