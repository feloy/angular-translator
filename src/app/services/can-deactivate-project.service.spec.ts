import { TestBed, inject } from '@angular/core/testing';

import { CanDeactivateProjectService } from './can-deactivate-project.service';

describe('CanDeactivateProjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateProjectService]
    });
  });

  it('should ...', inject([CanDeactivateProjectService], (service: CanDeactivateProjectService) => {
    expect(service).toBeTruthy();
  }));
});
