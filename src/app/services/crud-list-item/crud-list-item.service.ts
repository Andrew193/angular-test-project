import {Injectable, OnDestroy} from '@angular/core';
import {ListService} from "../list-service/list-service.service";
import {ListItemType} from "../../lists/lists.component";
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
import {Subject, takeUntil} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudListItemService implements OnDestroy{
  formik: any;
  _subscriptions$: Subject<any> = new Subject();
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

  constructor(private listService: ListService, private logger: LoggerService, public popupService: PopupService) {
  }

  initCrudForm(changesParser: () => void, selectedItem?: ListItemType | null) {
    this.formik = new FormGroup({
      name: new FormControl(selectedItem ? selectedItem.name : "", [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(40)
      ]),
      description: new FormControl(selectedItem ? selectedItem['description'] : "", Validators.maxLength(100)),
      tags: new FormArray(
        selectedItem ? selectedItem['tags'].map((tag: string) => new FormControl(tag)) : [new FormControl("")], Validators.maxLength(10))
    }, {validators: [this.nameDescription]})

    this.formik.valueChanges.pipe(takeUntil(this._subscriptions$)).subscribe(() => {
      changesParser();
    })

    console.log(this.formik)
    return this.formik;
  }

  ngOnDestroy() {
    this._subscriptions$.next(true);
    this._subscriptions$.unsubscribe();
  }

  updateExistingItem(selectedListID: number) {
    this.listService.updateItemById({...this.formik.value, id: selectedListID}, selectedListID - 1);
    this.logger.logMessage(this.logger.getLogConfig(`Item has been updated. Item id: ${selectedListID}`, LogTypes.LOG));
    this.popupService.showModal(`Item with id: ${selectedListID} has been updated`, this.crudPopupConfig);
  }

  createNewItem() {
    const currentItemsLength = this.listService.getItemsLength();
    this.listService.addItem({
      ...this.formik.value,
      id: currentItemsLength + 1
    })
    this.logger.logMessage(this.logger.getLogConfig("Item has been created", LogTypes.LOG));
    this.popupService.showModal("New item has been created", this.crudPopupConfig)
  }

  nameDescription: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const name = control.get('name');
    const description = control.get('description');

    return name && description && name.value === description.value
    && !!description.value  && !!name.value
      ? {nameDescription: "Name can not match description"}
      : null;
  };
}
