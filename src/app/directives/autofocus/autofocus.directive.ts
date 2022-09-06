import {Directive, ElementRef, HostBinding} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective {
  private wasFocused: boolean = false;

  constructor(private element: ElementRef) {
  }

  @HostBinding("class") get focusOnInit() {
    if (!this.wasFocused) {
      this.focus();
      this.wasFocused = true;
    }
    return ""
  }

  focus() {
    this.element.nativeElement.focus()
  }
}
