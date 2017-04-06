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

export function isLogoEnabled(toggles: IToggles, loggedIn = false): boolean {
  if(toggles.itJustRained){
    return toggles.logo;
  }
  return false;
}

