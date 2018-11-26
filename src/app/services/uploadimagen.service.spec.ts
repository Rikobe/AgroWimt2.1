import { TestBed, inject } from '@angular/core/testing';

import { UploadimagenService } from './uploadimagen.service';

describe('UploadimagenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadimagenService]
    });
  });

  it('should be created', inject([UploadimagenService], (service: UploadimagenService) => {
    expect(service).toBeTruthy();
  }));
});
