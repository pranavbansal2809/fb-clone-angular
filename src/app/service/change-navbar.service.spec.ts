import { TestBed } from '@angular/core/testing';

import { ChangeNavbarService } from './change-navbar.service';

describe('ChangeNavbarService', () => {
  let service: ChangeNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
