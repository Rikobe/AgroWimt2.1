import { TestBed, inject } from '@angular/core/testing';

import { TierrasService } from './tierras.service';

describe('TierrasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TierrasService]
    });
  });

  it('should be created', inject([TierrasService], (service: TierrasService) => {
    expect(service).toBeTruthy();
  }));
});
