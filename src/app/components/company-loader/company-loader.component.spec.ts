import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoaderComponent } from './company-loader.component';

describe('CompanyLoaderComponent', () => {
  let component: CompanyLoaderComponent;
  let fixture: ComponentFixture<CompanyLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
