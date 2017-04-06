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
        // ngModule stuff is missing
      });

      fixture = TestBed.createComponent(LandingContainerComponent);
      // comp =    // get the compnent instance from fixture
      el = fixture.debugElement.query(By.css('h3')).nativeElement;

    });

    // it('should render the title component and show Rainbows text', () => {
    //   // let the Testing Module know about the real LandingTitleComponent,
    //   // or create a mock of that component and declare that
    //   expect(el.innerText).toContain('Rainbows');
    // });

    // it('should set the heading color based on customizations service', () => {
    //   fixture.detectChanges();
    //   expect(el.style.color).toEqual('red');
    // });

    // it('should show the logo', () => {
    //   // use the debugElement as above to get the span
    // });
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

    // it('should hide the logo', () => {
    //   fixture.detectChanges();
    //   expect(fixture.debugElement.query(By.css('span'))).toBeFalsy();
    // });;
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