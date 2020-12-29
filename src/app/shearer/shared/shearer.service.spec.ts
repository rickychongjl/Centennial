import { TestBed } from '@angular/core/testing';

import { ShearerService } from './shearer.service';

describe('ShearerService', () => {
  let service: ShearerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShearerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
