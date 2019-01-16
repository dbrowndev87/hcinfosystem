import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserloginCreateComponent } from './userlogin-create.component';

describe('UserloginCreateComponent', () => {
  let component: UserloginCreateComponent;
  let fixture: ComponentFixture<UserloginCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserloginCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserloginCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
