import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillStudentComponent } from './bill-student.component';

describe('BillStudentComponent', () => {
  let component: BillStudentComponent;
  let fixture: ComponentFixture<BillStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
