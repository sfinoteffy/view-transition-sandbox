import { TestBed } from '@angular/core/testing';

import { StartViewTransitionService } from './start-view-transition.service';

describe('StartViewTransitionService', () => {
  let service: StartViewTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StartViewTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
