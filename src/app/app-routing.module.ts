import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";
import {Page404Component} from "./page404/page404.component";
import {NgModule} from "@angular/core";
import {BasicComponent} from "./basic/basic.component";
import {AppComponent} from "./app.component";
import {ListsComponent} from "./lists/lists.component";

export const routes: Routes = [
  {path: '', component: BasicComponent, title: "Dashboard"},
  {path: 'lists', component: ListsComponent, title: "Lists"},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [NavigationComponent, BasicComponent, Page404Component, AppComponent, ListsComponent]
