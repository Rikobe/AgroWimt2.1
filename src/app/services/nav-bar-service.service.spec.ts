import { TestBed, inject } from '@angular/core/testing';

import { NavBarServiceService } from './nav-bar-service.service';

describe('NavBarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavBarServiceService]
    });
  });

  it('should be created', inject([NavBarServiceService], (service: NavBarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
