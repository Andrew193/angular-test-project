import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[autoFocusEnter]'
})
export class AutofocusenterDirective {

  constructor(private element: ElementRef) { }

  @HostListener("mouseenter") focusOnMouseEnter() {
    this.focus()
  }

  focus() {
    this.element.nativeElement.focus()
  }
}
