import { isLogoEnabled, IToggles, createDefaultCustomizations } from './customizations.interface';

describe('ICustomizations', () => {

  it('should return false when asked if logo is enabled and logo is off', () => {
    let toggles: IToggles = {
      logo: false
    }
    expect(isLogoEnabled(toggles, true)).toEqual(false);
  });

  it('should return true when asked if logo is enabled and logo is on', () => {
  });

  describe('createDefaultCustomizations', () => {
    it('should return the default customizations', () => {
      // expect(createDefaultCustomizations())   ///
    });
  });

});