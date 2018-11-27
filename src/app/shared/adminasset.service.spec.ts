import { TestBed, inject } from '@angular/core/testing';

import { AdminassetService } from './adminasset.service';

describe('AdminassetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminassetService]
    });
  });

  it('should be created', inject([AdminassetService], (service: AdminassetService) => {
    expect(service).toBeTruthy();
  }));
});
