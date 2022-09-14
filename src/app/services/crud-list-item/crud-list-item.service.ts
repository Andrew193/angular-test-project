import {Injectable, OnDestroy} from '@angular/core';
import {ListService} from "../list-service/list-service.service";
import {ListItemType} from "../../list/lists/lists.component";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {LoggerService, LogTypes} from "../logger-service/logger.service";
import {PopupService} from "../popup/popup.service";
import {catchError, Subject, takeUntil} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GalleryService} from "../gallery/gallery.service";

@Injectable({
  providedIn: 'root'
})
export class CrudListItemService implements OnDestroy {
  formik: any;
  _subscriptions$: Subject<any> = new Subject();
  createdItemUpdater$: Subject<any> = new Subject<any>();
  crudPopupConfig = {
    customButton: true,
    customButtons: [
      {
        label: "Great",
        onclick: (): void => {
          this.popupService.hideModal(false);
        }
      }
    ]
  }

  constructor(private listService: ListService, private logger: LoggerService, public popupService: PopupService,
              private http: HttpClient, private galleryService: GalleryService) {
  }

  initCrudForm(changesParser: (newState?: boolean | undefined) => void, selectedItem?: ListItemType | null) {
    this.formik = new FormGroup({
      name: new FormControl(selectedItem ? selectedItem.name : "", [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(40)
      ]),
      description: new FormControl(selectedItem ? selectedItem['description'] : "", Validators.maxLength(100)),
      images: new FormArray(selectedItem && selectedItem['images'] ? selectedItem['images'].map((image: string) => new FormControl(image)) : [new FormControl("")]),
      tags: new FormArray(
        selectedItem && selectedItem['tags'] ? selectedItem['tags'].map((tag: string) => new FormControl(tag)) : [new FormControl("")], Validators.maxLength(10))
    }, {validators: [this.nameDescription]})
    this.formik.valueChanges.pipe(takeUntil(this._subscriptions$)).subscribe(() => {
      changesParser();
    })
    return this.formik;
  }

  ngOnDestroy() {
    this._subscriptions$.next(true);
    this._subscriptions$.unsubscribe();
  }

  updateExistingItem(selectedListID: number, images: string[]) {
    //Update the item
    this.http.put(`/items/${selectedListID}`, {...this.formik.value, images: images})
      .pipe(catchError((error) => {
        //Log an error
        this.logger.logMessage(this.logger.getLogConfig(error.message, LogTypes.LOG));
        return []
      }), takeUntil(this._subscriptions$))
      .subscribe((response: any) => {
        //Update the item in the service
        this.listService.updateItemById(response, selectedListID - 1);
        //Fetch this item's images ( I need IMAGE ID )
        this.galleryService.fetchImageByParentId(response.id)
          .pipe(takeUntil(this._subscriptions$))
          .subscribe((fetchedImage: any) => {
            //Update this item's images array
            this.galleryService.updateImage({
              parentId: fetchedImage[0].parentId,
              images: [...images],
              id: fetchedImage[0].id
            })
          })
        this.logger.logMessage(this.logger.getLogConfig(`Item has been updated. Item id: ${response.id}`, LogTypes.LOG));
        this.popupService.showModal(`Item with id: ${selectedListID} has been updated`, this.crudPopupConfig);
      })
  }

  createNewItem(images: string[]) {
    this.http.post("/items", {...this.formik.value, images: images})
      .pipe(takeUntil(this._subscriptions$))
      .subscribe((response: any) => {
        //Create list item
        this.listService.addItem(response)
        this.createdItemUpdater$.next(response.id)
        //Create images for this item
        this.galleryService.createImage({parentId: response.id, images})
        //Log these events
        this.logger.logMessage(this.logger.getLogConfig("Item has been created", LogTypes.LOG));
        this.popupService.showModal("New item has been created", this.crudPopupConfig)
      })

    return this.createdItemUpdater$;
  }

  deleteItem(id: number) {
    return this.listService.deleteItemById(id);
  }

  nameDescription: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const description = control.get('description');

    return name && description && name.value === description.value
    && !!description.value && !!name.value
      ? {nameDescription: "Name can not match description"}
      : null;
  };
}
