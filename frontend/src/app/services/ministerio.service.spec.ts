import { TestBed } from '@angular/core/testing';

import { MinisterioService } from './ministerio.service';

describe('MinisterioService', () => {
  let service: MinisterioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinisterioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
