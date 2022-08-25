import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";
import {Page404Component} from "./page404/page404.component";
import {NgModule} from "@angular/core";
import {BasicComponent} from "./basic/basic.component";
import {AppComponent} from "./app.component";
import {ListsComponent} from "./lists/lists.component";
import {CrudListItemComponent} from "./crud-list-item/crud-list-item.component";
import {ListItemComponent} from "./list-item/list-item.component";
import {ListItemsHeaderComponent} from "./list-items-header/list-items-header.component";

export const routes: Routes = [
  {path: '', component: BasicComponent, title: "Dashboard"},
  {
    path: 'lists',
    title: "Lists",
    children: [
      {path: '', component: ListsComponent},
      {path: 'crud/:id', component: CrudListItemComponent}
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

export const routingComponents = [NavigationComponent, BasicComponent, Page404Component, AppComponent, ListsComponent,
  ListsComponent, ListItemComponent, ListItemsHeaderComponent, CrudListItemComponent]
