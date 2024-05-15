import { TestBed } from '@angular/core/testing';

import { ShoeResolver } from './shoe.resolver';

describe('ShoeResolver', () => {
  let resolver: ShoeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ShoeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
