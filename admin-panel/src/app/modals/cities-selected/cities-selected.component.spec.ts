import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesSelectedComponent } from './cities-selected.component';

describe('CitiesSelectedComponent', () => {
  let component: CitiesSelectedComponent;
  let fixture: ComponentFixture<CitiesSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitiesSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
