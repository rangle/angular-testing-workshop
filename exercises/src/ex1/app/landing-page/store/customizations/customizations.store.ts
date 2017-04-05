import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { createAction } from '../../../store/create-action';
import { IAppState } from '../../../interfaces/app-state.interface';
import { ICustomizations } from '../../interfaces/customizations';

@Injectable()
export class CusotmizationsStore {
  public static RETRIEVE = 'CUSTOMIZATIONS_RETRIEVE';
  public static RETRIEVE_SUCCESS = 'CUSTOMIZATIONS_RETRIEVE_SUCCESS';
  public static RETRIEVE_ERROR = 'CUSTOMIZATIONS_RETRIEVE_ERROR';

  constructor(private store: Store<IAppState>) {
  }

  public getCustomizations(): Observable<ICustomizations> {
    return this.store.select(appState => appState.customizations);
  }

  public retrieve() {
    this.store.dispatch(createAction(CusotmizationsStore.RETRIEVE));
  }
}