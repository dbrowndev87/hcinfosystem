import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRosterComponent } from './faculty-roster.component';

describe('FacultyRosterComponent', () => {
  let component: FacultyRosterComponent;
  let fixture: ComponentFixture<FacultyRosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyRosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
