import { Action } from '@ngrx/store';

import { CusotmizationsStore } from './customizations.store';
import {
  ICustomizations,
  createDefaultCustomizations
} from '../../interfaces/customizations';

export function customizationsReducer(
  state: ICustomizations,
  action: Action
): ICustomizations {
  state = state || createDefaultCustomizations();

  switch (action.type) {
    case CusotmizationsStore.RETRIEVE:
      return {
        ...state,
        isLoading: true,
        loadingError: null
      }
    case CusotmizationsStore.RETRIEVE_SUCCESS:
      const customizationValues = action.payload.customizationValues;
      return {
        ...state,
        customizationValues: customizationValues
      }
  }
}