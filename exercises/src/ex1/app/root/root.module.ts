import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LandingPageModule } from '../landing-page/landing-page.module';

import { rootRoutes } from './root.routes';

import { RootComponent } from './components';

import { ApiService } from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRoutes),
    LandingPageModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [RootComponent]
})
export class RootModule {
}
