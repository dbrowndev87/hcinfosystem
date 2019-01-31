import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginListComponent } from './userlogin-list.component';

describe('UserloginListComponent', () => {
  let component: UserloginListComponent;
  let fixture: ComponentFixture<UserloginListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
