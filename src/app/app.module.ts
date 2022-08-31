import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CanActivateGuard} from "./guards/can-activate.guard";
import {CanDeactivateGuard} from "./guards/deactivate/can-deactivate.guard";

@NgModule({
  declarations: [routingComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [CanActivateGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
