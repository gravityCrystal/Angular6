import { TestBed } from '@angular/core/testing';

import { ServiceDemoService } from './service-demo.service';

describe('ServiceDemoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceDemoService = TestBed.get(ServiceDemoService);
    expect(service).toBeTruthy();
  });
});
