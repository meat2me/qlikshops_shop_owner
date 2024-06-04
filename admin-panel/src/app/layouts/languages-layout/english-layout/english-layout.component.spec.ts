import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishLayoutComponent } from './english-layout.component';

describe('EnglishLayoutComponent', () => {
  let component: EnglishLayoutComponent;
  let fixture: ComponentFixture<EnglishLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnglishLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
