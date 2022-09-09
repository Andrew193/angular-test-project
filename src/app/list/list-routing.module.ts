import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListsComponent} from "./lists/lists.component";
import {CrudListItemComponent} from "./crud-list-item/crud-list-item.component";
import {CanActivateGuard} from "../guards/can-activate.guard";
import {CanDeactivateGuard} from "../guards/deactivate/can-deactivate.guard";

export const ListRoutes: Routes = [
  {path: '', component: ListsComponent},
  {
    path: 'crud/:id',
    component: CrudListItemComponent,
    canActivate: [CanActivateGuard],
    canDeactivate: [CanDeactivateGuard]
  }
]

@NgModule({
  imports: [RouterModule.forChild(ListRoutes)],
  exports: [RouterModule]
})
export class ListRoutingModule {
}
