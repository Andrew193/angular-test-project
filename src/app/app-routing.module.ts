import {RouterModule, Routes} from "@angular/router";
import {NavigationComponent} from "./navigation/navigation.component";
import {Page404Component} from "./page404/page404.component";
import {NgModule} from "@angular/core";
import {BasicComponent} from "./basic/basic.component";
import {AppComponent} from "./app.component";
import {LoggerComponent} from "./logger/logger.component";
import {PopupComponent} from "./popup/popup.component";
import {ForTestsComponent} from "./for-tests/for-tests.component";

export const routes: Routes = [
  {path: '', component: BasicComponent},
  {
    path: 'lists',
    loadChildren: () => import("./list/list.module").then((module) => module.ListModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import("./gallery/gallery.module").then((module) => module.GalleryModule)
  },
  {path: '**', component: Page404Component}
];

export const routesForNavigation = [
  {path: '', title: "Dashboard"},
  {
    path: 'lists',
    title: "Lists",
    children: [{path: ''}, {path: 'crud/:id'}]
  },
  {
    path: 'gallery',
    title: "Gallery",
    children: [{path: ''}]
  },
  {path: '**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}

export const routingComponents = [NavigationComponent, BasicComponent, Page404Component, AppComponent,
  LoggerComponent, ForTestsComponent]
