import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {CanActivateGuard} from "./guards/can-activate.guard";
import {CanDeactivateGuard} from "./guards/deactivate/can-deactivate.guard";
import {TagsPipe} from './pipes/tags/tags.pipe';
import {AutofocusDirective} from './directives/autofocus/autofocus.directive';
import {AutofocusenterDirective} from './directives/autofocusenter/autofocusenter.directive';
import { ForTestsComponent } from './for-tests/for-tests.component';
import { HideDirective } from './directives/hide/hide.directive';
import { ListFilterPipe } from './pipes/listFilter/list-filter.pipe'

@NgModule({
  declarations: [routingComponents, TagsPipe, AutofocusDirective, AutofocusenterDirective, ForTestsComponent, HideDirective, ListFilterPipe],
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
