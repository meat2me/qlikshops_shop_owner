import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAddItemComponent } from './content-add-item.component';

describe('ContentAddItemComponent', () => {
  let component: ContentAddItemComponent;
  let fixture: ComponentFixture<ContentAddItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAddItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAddItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
