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
    it('should not show the icon when showIcon is falsy', () => {
      comp.showIcon = null;
      fixture.detectChanges();
      rainbowEl = el.querySelector('span');
      expect(rainbowEl).toBeFalsy();
    });

    // it('should hide icon when showIcon is false', () => {
    //   // the relevant property to false here
    //   // run change detection
    //   // check that the span doesn't exist
    // });

    // it('should show the icon when showIcon is true', () => {
    // });

  });

  describe('the heading color', () => {
    let headingEl;
    // it('should be set to black when landingPageTitleColor is not set', () => {
    //   // run change detection
    //   // get the element using a querySelector and then assertion on headingEl.style.color
    // });

    // it('should be set to green when landingPageTitleColor is green', () => {
    // });

  });

});
