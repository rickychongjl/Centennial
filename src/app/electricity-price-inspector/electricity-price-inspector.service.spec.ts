import { TestBed } from '@angular/core/testing';

import { ElectricityPriceInspectorService } from './electricity-price-inspector.service';

describe('ElectricityPriceInspectorService', () => {
  let service: ElectricityPriceInspectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectricityPriceInspectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
