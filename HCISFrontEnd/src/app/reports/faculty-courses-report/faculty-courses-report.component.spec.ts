import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCoursesReportComponent } from './faculty-courses-report.component';

describe('FacultyCoursesReportComponent', () => {
  let component: FacultyCoursesReportComponent;
  let fixture: ComponentFixture<FacultyCoursesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyCoursesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCoursesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
