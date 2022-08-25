import {Component, Input, OnInit} from '@angular/core';
import {errorMessagesType} from "../crud-list-item/crud-list-item.component";

@Component({
  selector: 'app-error-component',
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})

export class ErrorComponentComponent implements OnInit {
  @Input("field") field: any | undefined;
  @Input("getFieldErrors") getFieldErrors: ((field: string) => errorMessagesType) = () => [{
    errorName: "",
    errorMessage: undefined
  }]

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.field)
  }

}
