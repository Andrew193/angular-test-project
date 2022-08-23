import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule, routingComponents} from "./app-routing.module";
import { ListsComponent } from './lists/lists.component';
import { ListItemComponent } from './list-item/list-item.component';
import { ListItemsHeaderComponent } from './list-items-header/list-items-header.component';

@NgModule({
  declarations: [routingComponents, ListsComponent, ListItemComponent, ListItemsHeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
