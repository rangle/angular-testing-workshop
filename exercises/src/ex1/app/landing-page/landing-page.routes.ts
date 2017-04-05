import { Routes } from '@angular/router';

import { LandingContainerComponent } from './components';

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
  }
];