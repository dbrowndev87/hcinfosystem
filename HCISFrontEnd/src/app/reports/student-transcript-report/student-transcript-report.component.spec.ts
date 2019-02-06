import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentTranscriptReportComponent } from './student-transcript-report.component';

describe('StudentTranscriptReportComponent', () => {
  let component: StudentTranscriptReportComponent;
  let fixture: ComponentFixture<StudentTranscriptReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentTranscriptReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTranscriptReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
