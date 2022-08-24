
import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared.module';
import { HttpCustomInterceptorService } from './http-custom-interceptor.service';

describe('HttpCustomInterceptorService', () => {
  let service: HttpCustomInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        HttpClientModule,
      ],
      providers: [HttpCustomInterceptorService]
    });
    service = TestBed.inject(HttpCustomInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
