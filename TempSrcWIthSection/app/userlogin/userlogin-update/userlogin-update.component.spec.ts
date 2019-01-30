import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginUpdateComponent } from './userlogin-update.component';

describe('UserloginUpdateComponent', () => {
  let component: UserloginUpdateComponent;
  let fixture: ComponentFixture<UserloginUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
