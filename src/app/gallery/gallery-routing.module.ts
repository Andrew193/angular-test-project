import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {GalleryComponent} from "./gallery/gallery.component";

const galleryRoutes: Routes = [
  {path: '', component: GalleryComponent}
]

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})
export class GalleryRoutingModule {
}
