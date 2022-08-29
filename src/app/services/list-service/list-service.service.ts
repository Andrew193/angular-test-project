import {Injectable, OnInit} from '@angular/core';
import {ListItemType} from "../../lists/lists.component";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _items: ListItemType[] = [];
  _update: BehaviorSubject<ListItemType[]> = new BehaviorSubject<ListItemType[]>(this._items);

  constructor(private http: HttpClient) {
    this.fetchItems();
  }

  fetchItemById(id: number) {
    if (this._items.length === 0) {
      this.http.get('assets/mock-items.json')
        .subscribe((data: any) => {
          this._update.next(data.items.filter((item: ListItemType) => item.id === id))
        });
    } else {
      this._update.next(this._items.filter((item: ListItemType) => item.id === id))
    }
    return this._update;
  }

  fetchItems() {
    if (this._items.length === 0) {
      this.http.get('assets/mock-items.json')
        .subscribe((data: any) => {
          this._items = data.items;
          this._update.next(data.items)
        });
    }
    return this._update;
  }

  addItem(newItem: ListItemType) {
    this._items.push(newItem);
  }

  updateItemById(newItemConfig: ListItemType, id: number) {
    this._items[id] = newItemConfig;
  }

  getItems(): ListItemType[] {
    return this._items;
  }

  getItemsLength(): number {
    return this._items.length;
  }
}
