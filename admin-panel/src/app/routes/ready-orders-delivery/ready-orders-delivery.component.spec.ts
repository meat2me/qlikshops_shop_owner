import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyOrdersDeliveryComponent } from './ready-orders-delivery.component';

describe('ReadyOrdersDeliveryComponent', () => {
  let component: ReadyOrdersDeliveryComponent;
  let fixture: ComponentFixture<ReadyOrdersDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyOrdersDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyOrdersDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
