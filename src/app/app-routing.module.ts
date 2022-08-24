import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";
import {Page404Component} from "./page404/page404.component";
import {NgModule} from "@angular/core";
import {BasicComponent} from "./basic/basic.component";
import {AppComponent} from "./app.component";
import {ListsComponent} from "./lists/lists.component";
import {SelectedListItemComponent} from "./selected-list-item/selected-list-item.component";

export const routes: Routes = [
  {path: '', component: BasicComponent, title: "Dashboard"},
  {
    path: 'lists',
    title: "Lists",
    children: [
      {path: '', component: ListsComponent},
      {path: ':id', component: SelectedListItemComponent}
    ]
  },
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [NavigationComponent, BasicComponent, Page404Component, AppComponent, ListsComponent]
