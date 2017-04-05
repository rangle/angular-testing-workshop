import { DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LandingTitleComponent } from './landing-title.component';

describe('the landing title component', () => {
  let comp: LandingTitleComponent;
  let fixture: ComponentFixture<LandingTitleComponent>;
  let de: DebugElement;
  let el;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LandingTitleComponent
      ]
    });
    fixture = TestBed.createComponent(LandingTitleComponent);
    comp = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  describe('the rainbow icon', () => {
    let rainbowEl;
    it('should now show the icon when showIcon is falsy', () => {
      comp.showIcon = null;
      fixture.detectChanges();
      rainbowEl = el.querySelector('span');
      expect(rainbowEl).toBeFalsy();
    });

    it('should hide icon when showIcon is false', () => {
      comp.showIcon = false;
      fixture.detectChanges();
      rainbowEl = el.querySelector('span');
      expect(rainbowEl).toBeFalsy();
    });

    it('should show the icon when showIcon is true', () => {
      comp.showIcon = true;
      fixture.detectChanges();
      rainbowEl = el.querySelector('span');
      expect(rainbowEl.innerText).toContain('🌈');
    });

  });

  describe('the heading color', () => {
    let headingEl;
    it('should be set to black when landingPageTitleColor is not set', () => {
      fixture.detectChanges();
      headingEl = el.querySelector('h3');
      expect(headingEl.style.color).toEqual('black');
    });

    it('should be set to green when landingPageTitleColor is green', () => {
      comp.headingColor = 'green';
      fixture.detectChanges();
      headingEl = el.querySelector('h3');
      expect(headingEl.style.color).toEqual('green');
    });

  });

});
