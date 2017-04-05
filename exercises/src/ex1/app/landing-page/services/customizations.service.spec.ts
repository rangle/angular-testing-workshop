import { CustomizationsService } from './customizations.service';
import { Observable } from 'rxjs/Observable';
import { TestBed, inject, async } from '@angular/core/testing';
import { ApiService } from '../../root/services/api';

import { ICustomizations } from '../interfaces/customizations';

describe('Customizations service', () => {
  beforeEach(() => {
    let mockApiService = {
      location: '',
      get: (path): Observable<ICustomizations> => Observable.of({
        colors: {
          landingPageTitle: 'green'
        },
        toggles: {
          logo: true
        }
      })
    };
    TestBed.configureTestingModule({
      providers: [
        CustomizationsService,
        { provide: ApiService, useValue: mockApiService }
      ]
    })
  })

  it('should get data from /customizations endpoint',
    async(inject([CustomizationsService, ApiService],
      (customizationService: CustomizationsService, apiService: ApiService) => {
        // spy on apiService get mothod....
      })
    )
  );

  it('getColors should return an observable of color properties', () => {
    async(inject([CustomizationsService], (customizationService: CustomizationsService) => {
      customizationService.getColors().subscribe(colors => {
        expect(colors).toEqual({ landingPageTitle: 'green' });
      })
    }));
  });

  it('getToggles should ', () => {

  });

});