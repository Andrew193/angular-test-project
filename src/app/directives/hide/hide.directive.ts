import {
  Directive,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil} from "rxjs";

@Directive({
  selector: '[appHide]'
})
export class HideDirective implements OnInit, OnChanges, OnDestroy {
  public shouldHideElement: any;
  subscriptions: Subject<boolean> = new Subject<boolean>();
  shouldHideElementUpdater$: BehaviorSubject<any> = new BehaviorSubject<any>(this.shouldHide);

  @Input("appHide") get shouldHide(): any {
    return this.shouldHideElement;
  };

  set shouldHide(value: any) {
    this.shouldHideElement = value;
  }

  constructor(public contentRef: TemplateRef<any>, public viewRef: ViewContainerRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.shouldHide = !!changes['shouldHide'].currentValue;
    this.shouldHideElementUpdater$.next(this.shouldHide);
  }

  ngOnInit() {
    this.shouldHideElementUpdater$.pipe(takeUntil(this.subscriptions)).subscribe((newShouldHide) => {
      this.render(newShouldHide);
    })
  }

  render(newShouldHide: boolean | number) {
    if (newShouldHide) {
      this.viewRef.clear();
    } else {
      this.viewRef.createEmbeddedView(this.contentRef);
    }
  }

  ngOnDestroy() {
    this.subscriptions.next(true);
    this.subscriptions.unsubscribe();
  }
}
