import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideNavbarComponent } from './left-side-navbar.component';

describe('LeftSideNavbarComponent', () => {
  let component: LeftSideNavbarComponent;
  let fixture: ComponentFixture<LeftSideNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSideNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
