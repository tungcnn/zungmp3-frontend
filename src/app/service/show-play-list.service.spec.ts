import { TestBed } from '@angular/core/testing';

import { ShowPlayListService } from './show-play-list.service';

describe('ShowPlayListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowPlayListService = TestBed.get(ShowPlayListService);
    expect(service).toBeTruthy();
  });
});
