import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrudListItemComponent} from "./crud-list-item/crud-list-item.component";
import {ListItemComponent} from "./list-item/list-item.component";
import {ListItemsHeaderComponent} from "./list-items-header/list-items-header.component";
import {ListsComponent} from "./lists/lists.component";
import {ListFilterPipe} from "../pipes/listFilter/list-filter.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {ListRoutingModule} from "./list-routing.module";

@NgModule({
  declarations: [
    CrudListItemComponent,
    ListItemComponent,
    ListItemsHeaderComponent,
    ListsComponent,
    ListFilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ListRoutingModule
  ]
})
export class ListModule { }
