import {
  Component,
  Input
} from '@angular/core';

@Component({
  templateUrl: './landing-title.component.html',
  selector: 'app-landing-title'
})
export class LandingTitleComponent {
  @Input() showIcon;
  @Input() headingColor = 'black';
  
  constructor() { }
}
