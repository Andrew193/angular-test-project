import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {
  FormControl,
  Validators
} from "@angular/forms";
import {ListService} from "../../services/list-service/list-service.service";
import {LoggerService} from "../../services/logger-service/logger.service";
import {PopupService} from "../../services/popup/popup.service";
import {map, of, Subject, Subscription, takeUntil} from "rxjs";
import {CrudListItemService} from "../../services/crud-list-item/crud-list-item.service";
import {UploadConfigType} from "../../file-uploader/file-uploader.component";
import {ListItemType} from "../lists/lists.component";
import {GalleryService} from "../../services/gallery/gallery.service";

export type errorMessagesType = { errorName: string; errorMessage: string | undefined; }[];

function getErrorMessage(errorMessage: string, config: any) {
  return {
    required: "This field is required",
    minlength: `This field is too short. Min length: ${config.requiredLength}, actual length: ${config.actualLength}`,
    maxlength: `This field is too long. Max length: ${config.requiredLength}, actual length: ${config.actualLength}`,
  }[errorMessage]
}

@Component({
  selector: '[crud-list-item]',
  templateUrl: './crud-list-item.component.html',
  styleUrls: ['./crud-list-item.component.css'],
  providers: [CrudListItemService]
})

export class CrudListItemComponent implements OnInit, OnDestroy {
  selectedListID: number = 0;
  formik: any;
  isPageSaved: boolean = false;
  images: string[] = [];
  subcdriptions$: Subject<any> = new Subject<any>();
  uploadConfig: UploadConfigType = {
    label: "Upload item's images"
  }

  constructor(private route: ActivatedRoute, private listService: ListService,
              private logger: LoggerService, public popupService: PopupService,
              private crudList: CrudListItemService, public router: Router,
              public gallery: GalleryService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const idFromRoute = data['id'];
      this.selectedListID = isNaN(idFromRoute) ? 0 : +idFromRoute;
      this.setupComponent(this.selectedListID);
    });
  }

  ngOnDestroy() {
    this.subcdriptions$.next(true);
    this.subcdriptions$.unsubscribe();
  }

  formChangesTracker(newState?: boolean | undefined) {
    this.isPageSaved = newState || false;
  }

  setupComponent(selectedListID: number) {
    if (selectedListID) {
      this.listService.fetchItemById(selectedListID)
        .pipe(takeUntil(this.subcdriptions$))
        .subscribe((selectedItem) => {
          this.formik = this.crudList.initCrudForm(this.formChangesTracker.bind(this), selectedItem as ListItemType || null);
          this.images = this.formik.value.images;
        })
    } else {
      this.formik = this.crudList.initCrudForm(this.formChangesTracker.bind(this), null);
    }
  }

  canDeactivate() {
    if (this.isPageSaved) {
      return true;
    }
    return this.popupService.showModal("Do you really want to leave this page unsaved");
  }

  getTags() {
    return this.formik.controls.tags.controls;
  }

  public addImage = (images: string[]): void => {
    this.images = images;
  }

  createNewTag(tagConfig: FormControl) {
    if (!tagConfig.errors) {
      this.formik.controls.tags.push(new FormControl({
        value: this.getTagsLength() === 5 ? "Maximum amount of tags is 5" : "",
        disabled: this.getTagsLength() === 5,
      }, Validators.maxLength(10)))
    }
  }

  deleteTag(index: number) {
    if (this.formik.controls.tags.controls.length === 6) {
      this.formik.controls.tags.controls = this.formik.controls.tags.controls.slice(0, 5)
    }
    this.formik.controls.tags.removeAt(index)
  }

  getTagsLength() {
    return this.formik.controls.tags.controls.length;
  }

  onSubmit() {
    if (this.formik.status === "VALID") {
      this.isPageSaved = true;
      if (this.selectedListID) {
        this.crudList.updateExistingItem(this.selectedListID, this.images);
      } else {
        this.crudList.createNewItem(this.images)
          .pipe(takeUntil(this.subcdriptions$))
          .subscribe((createdItemId) => this.selectedListID = createdItemId)
      }
    }
  }

  deleteItem(event: MouseEvent) {
    this.formChangesTracker(true);
    event.stopPropagation();
    event.preventDefault();
    this.crudList.deleteItem(this.selectedListID)
      .pipe(takeUntil(this.subcdriptions$))
      .subscribe(() => {
        this.gallery.deleteImageFolder(undefined, this.selectedListID)
        this.router.navigate([`/lists`])
      })
  }

  public getFieldErrors = (field: string): errorMessagesType => {
    type controlsType = { [key: string]: any }
    const controls: controlsType = this.formik.controls;

    return Object.entries(controls[field].touched ? controls[field].errors
      || controls[field].controls[controls[field].controls.length - 1].errors : {})
      ?.map((error) => {
        return {errorName: error[0], errorMessage: getErrorMessage(error[0], error[1])}
      })
  }
}
