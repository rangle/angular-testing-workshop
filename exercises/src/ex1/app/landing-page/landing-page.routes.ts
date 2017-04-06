import { Routes } from '@angular/router';

import { LandingContainerComponent, LiveCodeComponent } from './components';

export const landingPageRoutes: Routes = [
  {
    path: '',
    redirectTo: 'landingPage',
    pathMatch: 'full',
  },
  {
    path: 'landingPage',
    component: LandingContainerComponent,
    children: [
    ]
  },
  {
    path: 'livecode',
    component: LiveCodeComponent,
    children: [
    ]
  }
];