import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyUpdateComponent } from './faculty-update.component';

describe('FacultyUpdateComponent', () => {
  let component: FacultyUpdateComponent;
  let fixture: ComponentFixture<FacultyUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacultyUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultyUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
