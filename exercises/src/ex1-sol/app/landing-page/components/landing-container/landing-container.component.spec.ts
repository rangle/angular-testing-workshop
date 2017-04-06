import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LandingContainerComponent } from './';
import { LandingTitleComponent } from '../landing-title';
import { CustomizationsService } from '../../services/customizations.service';
import { Observable } from 'rxjs/Observable';

describe('the logo container', () => {

  let fixture: ComponentFixture<LandingContainerComponent>;
  let comp: LandingContainerComponent;
  let el;

  describe('the landing container with logo toggled on', () => {
    beforeEach(() => {

      TestBed.configureTestingModule({
        declarations: [
          LandingContainerComponent,
          LandingTitleComponent
        ],
        providers: [
          {
            provide: CustomizationsService,
            useValue: mockApiServiceLogo
          }
        ]
      });

      fixture = TestBed.createComponent(LandingContainerComponent);
      comp = fixture.componentInstance;
      el = fixture.debugElement.query(By.css('h3')).nativeElement;

    });

    it('should render the title component and show Rainbows text', () => {
      expect(el.innerText).toContain('Rainbows');
    });

    it('should set the heading color based on customizations service', () => {
      fixture.detectChanges();
      expect(el.style.color).toEqual('red');
    });

    it('should show the logo', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('span'))).toBeTruthy();
    });
  });

  describe('when logo is toggled off', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          LandingContainerComponent,
          LandingTitleComponent
        ],
        providers: [
          {
            provide: CustomizationsService,
            useValue: mockApiServiceNoLogo
          }
        ]
      });
      fixture = TestBed.createComponent(LandingContainerComponent);
      comp = fixture.componentInstance;
      el = fixture.debugElement.query(By.css('h3')).nativeElement;
    });

    it('should hide the logo', () => {
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('span'))).toBeFalsy();
    });;
  });
});

let mockApiServiceNoLogo = {
  getColors: () => Observable.of({
    landingPageTitle: 'red'
  }),
  getToggles: () => Observable.of({
    logo: false
  })
};

let mockApiServiceLogo = {
  getColors: () => Observable.of({
    landingPageTitle: 'red'
  }),
  getToggles: () => Observable.of({
    logo: true
  })
};