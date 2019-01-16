import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginDeleteComponent } from './userlogin-delete.component';

describe('UserloginDeleteComponent', () => {
  let component: UserloginDeleteComponent;
  let fixture: ComponentFixture<UserloginDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
