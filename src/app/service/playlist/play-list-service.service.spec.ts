import { TestBed } from '@angular/core/testing';

import { PlayListServiceService } from './play-list-service.service';

describe('PlayListServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayListServiceService = TestBed.get(PlayListServiceService);
    expect(service).toBeTruthy();
  });
});
