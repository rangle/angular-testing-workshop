import {
  Component,
  OnInit
} from '@angular/core';
import { CustomizationsService } from '../../services';
import 'rxjs/add/operator/map';

@Component({
  templateUrl: './landing-container.template.html'
})
export class LandingContainerComponent {
  public landingPageColor;
  public showIcon;

  constructor(public customizationsService: CustomizationsService) {
    this.landingPageColor = customizationsService.getColors()
      .map(colors => colors.landingPageTitle);
    this.showIcon = customizationsService.getToggles()
      .map(toggles => toggles.logo);
  }
}
