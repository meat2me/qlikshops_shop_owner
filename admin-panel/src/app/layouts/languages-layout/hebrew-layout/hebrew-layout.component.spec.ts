import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HebrewLayoutComponent } from './hebrew-layout.component';

describe('HebrewLayoutComponent', () => {
  let component: HebrewLayoutComponent;
  let fixture: ComponentFixture<HebrewLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HebrewLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HebrewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
