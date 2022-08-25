import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ErrorComponentComponent } from './error-component/error-component.component';

@NgModule({
  declarations: [routingComponents, ErrorComponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
