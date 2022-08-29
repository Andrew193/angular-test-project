import {Injectable} from '@angular/core';
import {ListItemType} from "../../lists/lists.component";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _items: ListItemType[] = [{id: 1, name: "test"}, {id: 2, name: "rest"}];

  constructor() {
  }

  addItem(newItem: ListItemType) {
    this._items.push(newItem);
  }

  getItems(): Observable<ListItemType[]> {
    return of(this._items);
  }

  getItemsLength(): number {
    return this._items.length;
  }
}
