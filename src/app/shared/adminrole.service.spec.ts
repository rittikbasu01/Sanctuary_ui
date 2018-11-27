import { TestBed, inject } from '@angular/core/testing';

import { AdminroleService } from './adminrole.service';

describe('AdminroleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminroleService]
    });
  });

  it('should be created', inject([AdminroleService], (service: AdminroleService) => {
    expect(service).toBeTruthy();
  }));
});
