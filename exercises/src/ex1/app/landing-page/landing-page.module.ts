import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LandingContainerComponent } from './components';
import {
  LandingTitleComponent,
  LiveCodeComponent
} from './components';
import { CustomizationsService } from './services';
import { SmileyPipe } from './pipes';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LandingContainerComponent,
    LandingTitleComponent,
    LiveCodeComponent,
    SmileyPipe
  ],
  providers: [
    CustomizationsService
  ]
})
export class LandingPageModule {
}
