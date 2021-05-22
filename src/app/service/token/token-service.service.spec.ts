import { TestBed } from '@angular/core/testing';

import { TokenServiceService } from './token-service.service';

describe('TokenServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenServiceService = TestBed.get(TokenServiceService);
    expect(service).toBeTruthy();
  });
});
