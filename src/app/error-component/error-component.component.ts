import {Component, ContentChild, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {errorMessagesType} from "../crud-list-item/crud-list-item.component";
import {FormControl} from "@angular/forms";

type FieldType = { name: string, formikConfig: FormControl<string | null> }
type GetErrorsFunctionType = (field: string) => errorMessagesType;

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})

export class ErrorComponentComponent implements OnInit {
  public _fieldConfig: any;
  public _fieldName: string = "";
  public _getFieldErrors: GetErrorsFunctionType = () => [{
    errorName: "",
    errorMessage: undefined
  }]

  constructor(private renderer2: Renderer2) {
  }

  @ContentChild("fieldInput", {static: false}) fieldInput: ElementRef | undefined;

  @Input("field")
  get field() {
    return {
      name: this._fieldName,
      formikConfig: this._fieldConfig
    }
  }

  set field(fieldConfig: FieldType) {
    this._fieldName = fieldConfig.name;
    this._fieldConfig = fieldConfig.formikConfig;
  }

  @Input("getFieldErrors")
  set getFieldErrors(func: GetErrorsFunctionType) {
    this._getFieldErrors = (fieldName) => {
      this.renderer2.setStyle(this.fieldInput!.nativeElement, "border", "1px solid #ff6363");
      this.renderer2.setStyle(this.fieldInput!.nativeElement, "background", "#fce9e9");

      return func(fieldName)
    }
  }

  dropError() {
    this.renderer2.removeStyle(this.fieldInput!.nativeElement, "border");
    this.renderer2.removeStyle(this.fieldInput!.nativeElement, "background");
  }

  ngOnInit(): void {
    console.log(this.field, this.fieldInput)
  }

}
