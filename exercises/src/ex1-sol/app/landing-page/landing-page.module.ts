import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { LandingContainerComponent } from './components';
import { CustomizationsEffects } from './store/customizations/customizations.effects';
import { CustomizationsService } from './services';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.run(CustomizationsEffects)
  ],
  declarations: [LandingContainerComponent],
  providers: [CustomizationsService]
})
export class LandingPageModule {
}