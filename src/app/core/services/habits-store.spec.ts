import { TestBed } from '@angular/core/testing';

import { HabitsStore } from './habits-store';

describe('HabitsStore', () => {
  let service: HabitsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
