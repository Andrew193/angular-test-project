import {
  Component,
  EventEmitter,
  HostBinding,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PopupService} from "../services/popup/popup.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  animations: [
    trigger('state', [
      transition('* => *', animate('500ms ease')),
      state('opened', style({transform: 'translateY(0%)'})),
      state('void, closed', style({transform: 'translateY(100%)'})),
    ])
  ],
})

export class PopupComponent implements OnDestroy, OnInit {
  _message = '';
  unsubscribe$: Subject<boolean> = new Subject();

  constructor(public popupService: PopupService) {
  }

  ngOnInit() {
    this.setUpPopup();
  }

  setUpPopup() {
    this.popupService._isOpenedUpdater$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isOpened) => {
        this._message = this.popupService.getClearMessage();
        isOpened ? this.state = 'opened' : this.state = 'closed';
      })
  }

  @HostBinding("@state") state: 'opened' | 'closed' = 'closed';
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

  ngOnDestroy() {
    this.state = "closed"
    this.unsubscribe$.next(true);
    this.unsubscribe$.unsubscribe();
  }
}
