import { isLogoEnabled, IToggles } from './customizations.interface';

describe('ICustomizations', () => {

  describe('when it has just rained', () => {

    it('should return false when asked if logo is enabled and logo is off', () => {
      let toggles: IToggles = {
        logo: false,
        itJustRained: true
      }
      expect(isLogoEnabled(toggles, true)).toEqual(false);
    });

    it('should return true when asked if logo is enabled and logo is on', () => {
      let toggles: IToggles = {
        logo: true,
        itJustRained: true
      }
      expect(isLogoEnabled(toggles, true)).toEqual(true);
    });

  });

  describe('when it hasn\'t rained in a while', () => {

    it('should return false when asked if logo toggled off', () => {
      let toggles: IToggles = {
        logo: false,
        itJustRained: false
      }
      expect(isLogoEnabled(toggles, false)).toEqual(false);
    });

    it('should return false when logo is toggled on', () => {
      let toggles: IToggles = {
        logo: true,
        itJustRained: false
      }
      expect(isLogoEnabled(toggles, false)).toEqual(false);
    });

  });

});