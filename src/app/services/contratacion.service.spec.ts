import { TestBed, inject } from '@angular/core/testing';

import { ContratacionService } from './contratacion.service';

describe('ContratacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContratacionService]
    });
  });

  it('should be created', inject([ContratacionService], (service: ContratacionService) => {
    expect(service).toBeTruthy();
  }));
});
