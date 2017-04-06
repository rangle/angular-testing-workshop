import { TestBed, async, inject } from '@angular/core/testing';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';

let mockHttp;
let spyHttpGet;

describe('the api service', () => {
  beforeEach(() => {
    mockHttp = {
      get: (path) => {
        return Observable.of({
          json: () => {
            return {
              abc: 123
            };
          }
        });
      }
    };
    spyHttpGet = spyOn(mockHttp, 'get').and.callThrough();
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {
          provide: Http, useValue: mockHttp
        }
      ]
    });
  });
  it('should use the http://localhost:3000 url',
    async(inject([ApiService], (apiService: ApiService) => {
      apiService.get('').subscribe(() => {
        expect(spyHttpGet).toHaveBeenCalledWith('http://localhost:3000');
      });
    }))
  );

  it('should return the request body',
    async(inject([ApiService], (apiService: ApiService) => {
      apiService.get('').subscribe(result => {
        expect(result).toEqual({ abc: 123 });
      });
    }))
  );

});

