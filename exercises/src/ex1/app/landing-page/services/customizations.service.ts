import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../root/services/api/api.service';
import { ICustomizations, IColors, IToggles } from '../interfaces/customizations';

@Injectable()
export class CustomizationsService {
  constructor(private apiService: ApiService) { }

  public getCustomizations(): Observable<ICustomizations> {
    return this.apiService.get('/customizations');
  }

  public getColors(): Observable<IColors> {
    return (this.apiService.get('/customizations') as Observable<ICustomizations>)
      .map(customizations => customizations.colors);
  }

  public getToggles(): Observable<IToggles> {
    return (this.apiService.get('/customizations') as Observable<ICustomizations>)
      .map(customizatoins => customizatoins.toggles);
  }


}
