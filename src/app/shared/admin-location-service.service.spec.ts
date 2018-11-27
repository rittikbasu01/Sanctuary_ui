import { TestBed, inject } from '@angular/core/testing';

import { AdminLocationServiceService } from './admin-location-service.service';

describe('AdminLocationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLocationServiceService]
    });
  });

  it('should be created', inject([AdminLocationServiceService], (service: AdminLocationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
