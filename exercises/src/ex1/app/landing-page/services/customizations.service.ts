import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from '../../root/services/api/api.service';
import { ICustomizations, IColors, IToggles } from '../interfaces/customizations';

@Injectable()
export class CustomizationsService {
  constructor(private apiService: ApiService) { }

  public getColors(): Observable<IColors> {
    return (this.apiService.get('/customizations') as Observable<ICustomizations>)
      .map(customizations => customizations.colors);
  }

  public getToggles(): Observable<IToggles> {
    return (this.apiService.get('/customizations') as Observable<ICustomizations>)
      .map(customizations => customizations.toggles);
  }


}
