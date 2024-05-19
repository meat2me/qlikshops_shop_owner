import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPurchaseComponent } from './open-purchase.component';

describe('OpenPurchaseComponent', () => {
  let component: OpenPurchaseComponent;
  let fixture: ComponentFixture<OpenPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
