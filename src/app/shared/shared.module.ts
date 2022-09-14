import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorComponentComponent} from "../error-component/error-component.component";
import {TagsPipe} from "../pipes/tags/tags.pipe";
import {HideDirective} from "../directives/hide/hide.directive";
import {AutofocusDirective} from "../directives/autofocus/autofocus.directive";
import {AutofocusenterDirective} from "../directives/autofocusenter/autofocusenter.directive";
import {FileUploaderComponent} from "../file-uploader/file-uploader.component";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {PopupComponent} from "../popup/popup.component";

@NgModule({
  declarations: [
    ErrorComponentComponent,
    TagsPipe,
    HideDirective,
    AutofocusDirective,
    AutofocusenterDirective,
    FileUploaderComponent,
    PopupComponent
  ],
    imports: [
        CommonModule,
        LazyLoadImageModule
    ],
  exports:[
    ErrorComponentComponent,
    AutofocusDirective,
    AutofocusenterDirective,
    TagsPipe,
    HideDirective,
    FileUploaderComponent,
    PopupComponent
  ]
})

export class SharedModule { }
