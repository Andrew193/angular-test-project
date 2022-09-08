import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CanActivateGuard} from "./guards/can-activate.guard";
import {CanDeactivateGuard} from "./guards/deactivate/can-deactivate.guard";
import {ListModule} from "./list/list.module";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [routingComponents],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ListModule,
    SharedModule
  ],
  providers: [CanActivateGuard, CanDeactivateGuard],
  bootstrap: [AppComponent]
})

export class AppModule {
}
