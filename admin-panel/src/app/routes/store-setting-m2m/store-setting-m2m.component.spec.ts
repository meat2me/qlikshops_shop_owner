import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSettingM2mComponent } from './store-setting-m2m.component';

describe('StoreSettingM2mComponent', () => {
  let component: StoreSettingM2mComponent;
  let fixture: ComponentFixture<StoreSettingM2mComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSettingM2mComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSettingM2mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
