import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";
import {Page404Component} from "./page404/page404.component";
import {NgModule} from "@angular/core";
import {BasicComponent} from "./basic/basic.component";
import {AppComponent} from "./app.component";
import {ListsComponent} from "./list/lists/lists.component";
import {CrudListItemComponent} from "./list/crud-list-item/crud-list-item.component";
import {ErrorComponentComponent} from "./error-component/error-component.component";
import {LoggerComponent} from "./logger/logger.component";
import {PopupComponent} from "./popup/popup.component";
import {CanActivateGuard} from "./guards/can-activate.guard";
import {CanDeactivateGuard} from "./guards/deactivate/can-deactivate.guard";
import {TagsPipe} from "./pipes/tags/tags.pipe";
import {AutofocusDirective} from "./directives/autofocus/autofocus.directive";
import {AutofocusenterDirective} from "./directives/autofocusenter/autofocusenter.directive";
import {ForTestsComponent} from "./for-tests/for-tests.component";
import {HideDirective} from "./directives/hide/hide.directive";
import {ListFilterPipe} from "./pipes/listFilter/list-filter.pipe";

export const routes: Routes = [
  {path: '', component: BasicComponent, title: "Dashboard"},
  {
    path: 'lists',
    title: "Lists",
    children: [
      {path: '', component: ListsComponent},
      {
        path: 'crud/:id',
        component: CrudListItemComponent,
        canActivate: [CanActivateGuard],
        canDeactivate: [CanDeactivateGuard]
      }
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

export const routingComponents = [NavigationComponent, BasicComponent, Page404Component, AppComponent,
  LoggerComponent, PopupComponent, ForTestsComponent]
