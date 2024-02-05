import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsVerificationModalComponent } from './sms-verification-modal.component';

describe('SmsVerificationModalComponent', () => {
  let component: SmsVerificationModalComponent;
  let fixture: ComponentFixture<SmsVerificationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsVerificationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsVerificationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
