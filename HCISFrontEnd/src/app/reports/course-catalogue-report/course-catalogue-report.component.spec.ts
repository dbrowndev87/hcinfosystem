import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogueReportComponent } from './course-catalogue-report.component';

describe('CourseCatalogueReportComponent', () => {
  let component: CourseCatalogueReportComponent;
  let fixture: ComponentFixture<CourseCatalogueReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCatalogueReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCatalogueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
