import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, Subscriber, Subscription} from "rxjs";

type PopupServiceConfigType = {
  customButton: boolean,
  customButtons: Array<{ onclick: () => void, label: string }>,
  customContent?: any
}

@Injectable({
  providedIn: 'root'
})
export class PopupService implements OnDestroy {
  private isOpened: boolean = false;
  private reaction: boolean = false;
  popupConfig: PopupServiceConfigType | undefined;
  private message: string = "";
  private subscriptions: Subscription[] = [];
  isAllowed$: Subject<boolean> = new Subject();
  _isOpenedUpdater$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isOpened);

  resetWindowConfiguration() {
    // this.isOpened = false;
    // this.reaction = false
    // this.popupConfig = undefined
    // this.message = "";
  }

  get getClearMessage(): string {
    return this.message;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  showModal(message: string, config?: PopupServiceConfigType): Observable<boolean> {
    this.message = message;
    this.isOpened = true;
    this.popupConfig = config;
    this._isOpenedUpdater$.next(this.isOpened);

    //Promise realisation
    // return new Promise((resolve) => {
    //   this._isOpenedUpdater$.subscribe(() => {
    //       if (this.reaction) {
    //         resolve(true)
    //         setTimeout(() => this.reaction = false)
    //       }
    //     }
    //   )
    // }).then((data) => data).catch((error) => false);
    this._isOpenedUpdater$.subscribe(() => this.isAllowed$.next(this.reaction))
    return this.isAllowed$.asObservable();
  }

  hideModal(reaction: boolean) {
    const timer = setTimeout(() => {
      this.message = "";
      clearTimeout(timer);
    }, 510)
    this.isOpened = false;
    this.reaction = reaction;
    this._isOpenedUpdater$.next(this.isOpened);
  }

  constructor() {
  }
}
