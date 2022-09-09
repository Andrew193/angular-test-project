import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponentComponent} from "../error-component/error-component.component";
import {TagsPipe} from "../pipes/tags/tags.pipe";
import {HideDirective} from "../directives/hide/hide.directive";
import {AutofocusDirective} from "../directives/autofocus/autofocus.directive";
import {AutofocusenterDirective} from "../directives/autofocusenter/autofocusenter.directive";

@NgModule({
  declarations: [
    ErrorComponentComponent,
    TagsPipe,
    HideDirective,
    AutofocusDirective,
    AutofocusenterDirective,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ErrorComponentComponent,
    AutofocusDirective,
    AutofocusenterDirective,
    TagsPipe,
    HideDirective
  ]
})

export class SharedModule { }
