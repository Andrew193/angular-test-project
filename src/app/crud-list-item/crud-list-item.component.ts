import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {ListService} from "../services/list-service/list-service.service";
import {LoggerService, LogTypes} from "../services/logger-service/logger.service";
import {PopupService} from "../services/popup/popup.service";
import {ListItemType} from "../lists/lists.component";
import {of, Subscription, takeUntil} from "rxjs";
import {CrudListItemService} from "../services/crud-list-item/crud-list-item.service";

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
  private paramsSubscription: Subscription[] = [];

  constructor(private route: ActivatedRoute, private listService: ListService,
              private logger: LoggerService, public popupService: PopupService,
              private crudList: CrudListItemService) {
  }

  ngOnInit(): void {
    const subscription = this.route.params.subscribe((data) => {
      const idFromRoute = data['id'];
      this.selectedListID = isNaN(idFromRoute) ? 0 : +idFromRoute;
      this.setupComponent(this.selectedListID);
    });
    this.paramsSubscription.push(subscription)
  }

  ngOnDestroy() {
    this.paramsSubscription.forEach((subscription) => subscription.unsubscribe())
  }

  formChangesTracker() {
    this.isPageSaved = false;
  }

  setupComponent(selectedListID: number) {
    if (selectedListID) {
      const subscription = this.listService.fetchItemById(selectedListID)
        .subscribe((selectedItem) => this.formik = this.crudList.initCrudForm(this.formChangesTracker.bind(this), selectedItem[0] || null))
      this.paramsSubscription.push(subscription)
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
        this.crudList.updateExistingItem(this.selectedListID);
      } else {
        this.crudList.createNewItem();
      }
    }
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
