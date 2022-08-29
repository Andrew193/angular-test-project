import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private isOpened: boolean = false;
  private message: string = "";
  _isOpenedUpdater$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isOpened);

  getMessage(): Observable<string> {
    return of(this.message);
  }

  getClearMessage(): string {
    return this.message;
  }

  getIsOpened(): Observable<boolean> {
    return of(this.isOpened)
  }

  showModal(message: string): void {
    this.message = message;
    this.isOpened = true;
    this._isOpenedUpdater$.next(this.isOpened);
  }

  hideModal() {
    this.message = "";
    this.isOpened = false;
    this._isOpenedUpdater$.next(this.isOpened);
  }

  constructor() {
  }

}
