import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAccordionComponent } from './category-accordion.component';

describe('CategoryAccordionComponent', () => {
  let component: CategoryAccordionComponent;
  let fixture: ComponentFixture<CategoryAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
