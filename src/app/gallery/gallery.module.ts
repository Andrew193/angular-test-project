import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GalleryComponent} from "./gallery/gallery.component";
import {GalleryRoutingModule} from "./gallery-routing.module";
import {GalleryItemComponent} from "./gallery-item/gallery-item.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [GalleryComponent, GalleryItemComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    LazyLoadImageModule,
    SharedModule
  ],
  exports: [GalleryComponent, GalleryItemComponent]
})

export class GalleryModule {
}
