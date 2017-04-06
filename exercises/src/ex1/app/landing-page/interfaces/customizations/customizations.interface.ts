import { ILoadable } from '../../../loading/interfaces/loadable/loadable';

export interface ICustomizations {
  colors: IColors;
  toggles: IToggles;
}

export interface IColors {
  landingPageTitle: string;
}

export interface IToggles {
  logo: boolean;
  itJustRained: boolean;
}


// what if this was the business logic instead?
export function isLogoEnabled(toggles: IToggles): boolean {
  if(toggles.itJustRained){
    return toggles.logo;
  }
  return false;
}

