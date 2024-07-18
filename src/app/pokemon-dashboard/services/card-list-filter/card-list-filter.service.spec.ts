import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CardListFilterService } from './card-list-filter.service';

describe('CardListFilterService', () => {
  let service: CardListFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CardListFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
