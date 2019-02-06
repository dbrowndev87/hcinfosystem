import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyCoursesComponent } from './faculty-courses.component';

describe('FacultyCoursesComponent', () => {
  let component: FacultyCoursesComponent;
  let fixture: ComponentFixture<FacultyCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
