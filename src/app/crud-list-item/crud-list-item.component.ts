import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../services/list-service/list-service.service";
import {LoggerService, LogTypes} from "../services/logger-service/logger.service";
import {PopupService} from "../services/popup/popup.service";
import {ListItemType} from "../lists/lists.component";
import {BehaviorSubject} from "rxjs";

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
  styleUrls: ['./crud-list-item.component.css']
})

export class CrudListItemComponent implements OnInit {
  selectedListID: number = 0;
  formik: any;

  constructor(private route: ActivatedRoute, private listService: ListService,
              private logger: LoggerService, public popupService: PopupService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      const idFromRoute = data['id'];
      this.selectedListID = isNaN(idFromRoute) ? 0 : +idFromRoute;
      this.setupComponent(this.selectedListID);
    });
  }

  setupComponent(selectedListID: number) {
    if (selectedListID) {
      this.listService.fetchItemById(selectedListID)
        .subscribe((selectedItem) => this.initCrudForm(selectedItem[0] || null))
    } else {
      this.initCrudForm();
    }
  }

  initCrudForm(selectedItem?: ListItemType | null) {
    this.formik = new FormGroup({
      name: new FormControl(selectedItem ? selectedItem.name : "", [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(40)
      ]),
      description: new FormControl(selectedItem ? selectedItem['description'] : "", Validators.maxLength(100)),
      tags: new FormArray([new FormControl(selectedItem ? selectedItem['tags'] : "", Validators.maxLength(10))])
    })
  }

  getTags() {
    return this.formik.controls.tags.controls;
  }

  createNewTag(tagConfig: FormControl) {
    if (!tagConfig.errors) {
      this.formik.controls.tags.push(new FormControl("", Validators.maxLength(10)))
    }
  }

  deleteTag(index: number) {
    this.formik.controls.tags.removeAt(index)
  }

  getTagsLength() {
    return this.formik.controls.tags.controls.length;
  }

  onSubmit() {
    if (this.formik.status === "VALID") {
      if (this.selectedListID) {
        this.updateExistingItem();
      } else {
        this.createNewItem();
      }
    }
  }

  updateExistingItem() {
    this.listService.updateItemById({...this.formik.value, id: this.selectedListID}, this.selectedListID - 1);
    this.logger.logMessage(this.logger.getLogConfig(`Item has been updated. Item id: ${this.selectedListID}`, LogTypes.LOG));
    this.popupService.showModal(`Item with id: ${this.selectedListID} has been updated`);
  }

  createNewItem() {
    const currentItemsLength = this.listService.getItemsLength();
    this.listService.addItem({
      ...this.formik.value,
      id: currentItemsLength + 1
    })
    this.logger.logMessage(this.logger.getLogConfig("Item has been created", LogTypes.LOG));
    this.popupService.showModal("New item has been created");
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
