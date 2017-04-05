import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStoreModule } from '@ngrx/router-store';

import { LandingPageModule } from '../landing-page/landing-page.module';

import { rootRoutes } from './root.routes';
import { rootReducer } from '../store/root-reducer';

import { RootComponent } from './components';

import { CusotmizationsStore } from '../landing-page/store/stores';
import { ApiService } from './services';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(rootRoutes),
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    LandingPageModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [
    ApiService,
    CusotmizationsStore,
  ],
  bootstrap: [RootComponent]
})
export class RootModule {
}
