import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

import { CusotmizationsStore } from './customizations.store';
import { createAction } from '../../../store/create-action';
import { CustomizationsService } from '../../services/customizations.service';

@Injectable()
export class CustomizationsEffects {

  @Effect()
  private retrieve$ = this.actions$
    .ofType(CusotmizationsStore.RETRIEVE)
    .mergeMap(() => this.customizationsService.getCustomizations()
      .map(customizations => createAction(CusotmizationsStore.RETRIEVE_SUCCESS, { customizations }))
      .catch(error => Observable.of(createAction(CusotmizationsStore.RETRIEVE_ERROR, { error })))
    );

  constructor(
    private actions$: Actions,
    private customizationsService: CusotmizationsStore
  ) { }

}

