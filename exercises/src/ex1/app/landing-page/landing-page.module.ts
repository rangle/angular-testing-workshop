import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingContainerComponent } from './components';
import { LandingTitleComponent } from './components';
import { CustomizationsService } from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LandingContainerComponent,
    LandingTitleComponent
  ],
  providers: [
    CustomizationsService
  ]
})
export class LandingPageModule {
}
