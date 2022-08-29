import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListService} from "../services/list-service/list-service.service";
import {LoggerService, LogTypes} from "../services/logger-service/logger.service";
import {PopupService} from "../services/popup/popup.service";

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
              private logger: LoggerService, public popupService:PopupService) {
  }

  ngOnInit(): void {
    const idFromRoute = +this.route.snapshot.params['id'];
    this.selectedListID = isNaN(idFromRoute) ? 0 : idFromRoute;
    this.initCrudForm();
  }

  initCrudForm() {
    this.formik = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(40)
      ]),
      description: new FormControl("", Validators.maxLength(100)),
      tags: new FormControl("")
    })
  }

  onSubmit() {
    if (this.formik.status === "VALID") {
      const currentItemsLength = this.listService.getItemsLength();

      this.listService.addItem({
        ...this.formik.value,
        id: currentItemsLength + 1
      })

      this.logger.logMessage(this.logger.getLogConfig("Item has been added", LogTypes.LOG));
      this.popupService.showModal("Test");
    }
  }

  public getFieldErrors = (field: string): errorMessagesType => {
    type controlsType = { [key: string]: any }
    const controls: controlsType = this.formik.controls;

    return Object.entries(controls[field].touched ? controls[field].errors : {})
      ?.map((error) => {
        return {errorName: error[0], errorMessage: getErrorMessage(error[0], error[1])}
      })
  }

}
