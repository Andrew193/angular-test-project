import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { ListsComponent } from './lists/lists.component';

@NgModule({
  declarations: [routingComponents, ListsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
