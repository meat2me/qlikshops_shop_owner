import { TestBed } from '@angular/core/testing';

import { ContentItemEditGuard } from './content-item-edit.guard';

describe('ContentItemEditGuard', () => {
  let guard: ContentItemEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ContentItemEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
