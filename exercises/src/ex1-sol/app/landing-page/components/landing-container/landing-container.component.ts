import {
  Component,
  OnInit
} from '@angular/core';
import { CusotmizationsStore } from '../../store/customizations/customizations.store';

@Component({
  templateUrl: './landing-container.template.html'
})
export class LandingContainerComponent implements OnInit {
  public message = '🌈rainbows';

  constructor() { }

  ngOnInit() {
  }

}
