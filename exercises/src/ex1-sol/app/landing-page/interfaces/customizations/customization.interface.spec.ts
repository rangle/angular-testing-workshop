import { isLogoEnabled, IToggles, createDefaultCustomizations } from './customizations.interface';

describe('ICustomizations', () => {

  describe('when user is logged in', () => {

    it('should return false when asked if logo is enabled and logo is off', () => {
      let toggles: IToggles = {
        logo: false
      }
      expect(isLogoEnabled(toggles, true)).toEqual(false);
    });

    it('should return true when asked if logo is enabled and logo is on', () => {
      let toggles: IToggles = {
        logo: true
      }
      expect(isLogoEnabled(toggles, true)).toEqual(true);
    });

  });

  describe('when user is logged out', () => {

    it('should return false when asked if logo is enabled and logo is off', () => {
      let toggles: IToggles = {
        logo: false
      }
      expect(isLogoEnabled(toggles, false)).toEqual(false);
    });

    it('should return true when asked if logo is enabled and logo is on', () => {
      let toggles: IToggles = {
        logo: true
      }
      expect(isLogoEnabled(toggles, false)).toEqual(false);
    });

  });

  describe('createDefaultCustomizations', () => {
    it('should return the default customizations', () => {
      expect(createDefaultCustomizations()).toEqual({
        colors: {
          landingPageTitle: 'black'
        },
        toggles: {
          logo: false
        }
      })
    })
  })

});