import { TestBed } from '@angular/core/testing';

import { ControlSystemInspectorService } from './control-system-inspector.service';

describe('ControlSystemInspectorService', () => {
  let service: ControlSystemInspectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlSystemInspectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
