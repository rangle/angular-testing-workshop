import { combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

import { customizationsReducer, } from '../landing-page/store/customizations/customizations.reducer';

const reducers = {
  customizations: customizationsReducer
};

export function rootReducer(state: any, action: any) {
  return compose(
    combineReducers
  )(reducers)(state, action);
}
