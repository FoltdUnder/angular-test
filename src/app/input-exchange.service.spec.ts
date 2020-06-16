import {TestBed} from '@angular/core/testing';

import {InputExchangeService} from './input-exchange.service';

describe('InputExchangeService', () => {
  let service: InputExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InputExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
