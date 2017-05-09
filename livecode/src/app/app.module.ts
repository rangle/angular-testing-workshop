import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {ToDoListComponent} from './to-do-list/to-do-list.component';
import {GenericInputComponent} from './generic-input/generic-input.component';
import {ToDoService} from './services/to-do.service';
import {ApiService} from './services/api.service';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    GenericInputComponent,
    CapitalizePipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    ToDoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
