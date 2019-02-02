import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCatalogueComponent } from './course-catalogue.component';

describe('CourseCatalogueComponent', () => {
  let component: CourseCatalogueComponent;
  let fixture: ComponentFixture<CourseCatalogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCatalogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
