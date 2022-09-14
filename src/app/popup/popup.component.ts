import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  HostBinding, HostListener,
  OnDestroy,
  OnInit,
  Output, Renderer2, ViewChild
} from '@angular/core';
import {PopupService} from "../services/popup/popup.service";
import {Subject, takeUntil} from "rxjs";
import {PopupAnimation, PopupBackAnimation} from "./popupanimation";

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    PopupAnimation,
    PopupBackAnimation
  ],
})

export class PopupComponent implements OnDestroy, OnInit {
  _message = '';
  innerHeight: number = 0;
  unsubscribe$: Subject<boolean> = new Subject();

  @ViewChild('customContentTarget') customContentTarget!: ElementRef;

  constructor(public popupService: PopupService, private renderer: Renderer2) {
  }

  blockView(isOpened: boolean) {
    if (isOpened) {
      const scrolledTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      this.renderer.setStyle(document.body, 'overflow', 'hidden')
      document.body.querySelectorAll(".popup-root").forEach((element) => {
        this.renderer.setStyle(element, 'margin-top', `${this.popupService.popupConfig?.customContent ? scrolledTop - 100 : scrolledTop}px`);
      })
    } else {
      this.renderer.setStyle(document.body, 'overflow', 'auto')
    }
  }

  renderCustomContent(isOpened: boolean) {
    if (this.popupService.popupConfig?.customContent && isOpened) {
      this.customContentTarget.nativeElement.appendChild(this.popupService.popupConfig?.customContent);
    }
    if (!isOpened && this.popupService.popupConfig?.customContent) {
      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.customContentTarget.nativeElement.innerHTML = ''
      }, 1000)
    }
    if (this.state === "opened") {
      this.popupService.resetWindowConfiguration();
    }
  }

  ngOnInit() {
    this.setUpPopup();
    this.innerHeight = window.innerHeight - 2;
  }

  setUpPopup() {
    this.popupService._isOpenedUpdater$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isOpened) => {
        this._message = this.popupService.getClearMessage;
        console.log("fdfsfsfs")
        this.blockView(isOpened);
        this.renderCustomContent(isOpened);
        isOpened ? this.state = 'opened' : this.state = 'closed';
      })
  }

  state: 'opened' | 'closed' = 'closed';

  @HostBinding("style") get class() {
    return this.state === 'opened' ? "height: 100%" : ""
  }

  @Output() yes = new EventEmitter<void>();
  @Output() no = new EventEmitter<void>();

  apply() {
    this.yes.emit();
  }

  reject() {
    this.no.emit();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.innerHeight = window.innerHeight - 2;
  }

  ngOnDestroy() {
    this.state = "closed"
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
