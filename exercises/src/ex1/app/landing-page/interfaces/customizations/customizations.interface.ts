import { ILoadable } from '../../../loading/interfaces/loadable/loadable';

export interface ICustomizations {
  colors: IColors,
  toggles: IToggles
}

export interface IColors {
  landingPageTitle: string
}

export interface IToggles {
  logo: boolean
}

export function isLogoEnabled(toggles: IToggles, loggedIn = false): boolean {
  return toggles.logo;
}

export function createDefaultCustomizations(): ICustomizations {
  return {
    colors: {
      landingPageTitle: 'black'
    },
    toggles: {
      logo: false
    }
  };
}

