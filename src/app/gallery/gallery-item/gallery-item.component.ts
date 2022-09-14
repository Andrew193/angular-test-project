import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ListService} from "../../services/list-service/list-service.service";
import {ListItemType} from "../../list/lists/lists.component";
import {Router} from "@angular/router";
import {GalleryService} from "../../services/gallery/gallery.service";

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.css']
})

export class GalleryItemComponent implements OnInit, OnDestroy {
  _itemId: number = 0;
  _imageFolderId: number = 0;
  relatedListItem: ListItemType = {name: '', id: 0};
  subscriptions$: Subject<any> = new Subject<any>();

  @Output() expandImage = new EventEmitter();

  @Input("itemId") set itemId(itemId: number) {
    this._itemId = itemId;
  }

  @Input("imageFolderId") set imageFolderId(imageFolderId: number) {
    this._imageFolderId = imageFolderId;
  }

  showImageInModalWindow(imageSrc: string, imageId: number) {
    this.expandImage.emit({
      imageSrc, deleteImage: () => {
        this.relatedListItem['images'].splice(imageId, 1)
        this.galleryService.updateImage({
          id: this.imageFolderId,
          parentId: this.itemId,
          images: this.relatedListItem['images']
        }, ()=>{
          this.listService.updateItemByIdApiCall(this.relatedListItem)
            .pipe(takeUntil(this.subscriptions$))
            .subscribe(() => this.listService.updateItemById(this.relatedListItem, this.itemId))
        })
      }
    })
  }

  get itemId() {
    return this._itemId;
  }

  get imageFolderId() {
    return this._imageFolderId;
  }

  constructor(private listService: ListService, private route: Router, private galleryService: GalleryService) {
  }

  redirectToSelectedItem() {
    this.route.navigate(['/lists/crud/', this.itemId])
  }

  getItem() {
    this.listService.fetchItemById(this.itemId)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe((fetchedItem) => this.relatedListItem = fetchedItem as ListItemType)
  }

  ngOnInit(): void {
    this.getItem()
  }

  ngOnDestroy() {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
  }
}
