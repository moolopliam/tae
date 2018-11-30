import { TestBed } from '@angular/core/testing';

import { BMIService } from './bmi.service';

describe('BMIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BMIService = TestBed.get(BMIService);
    expect(service).toBeTruthy();
  });
});
