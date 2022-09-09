import {
  Component,
  EventEmitter,
  HostBinding, HostListener,
  OnDestroy,
  OnInit,
  Output
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

  constructor(public popupService: PopupService) {
  }

  ngOnInit() {
    this.setUpPopup();
    this.innerHeight = window.innerHeight - 2;
  }

  setUpPopup() {
    this.popupService._isOpenedUpdater$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isOpened) => {
        this._message = this.popupService.getClearMessage();
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
