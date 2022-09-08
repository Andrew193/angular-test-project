import {Injectable} from '@angular/core';
import {ListItemType} from "../../list/lists/lists.component";
import {BehaviorSubject, catchError, map, throwError} from "rxjs";
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
    this._update.next(this._items.filter((item: ListItemType) => item.id === id))
    return this._update;
  }

  fetchItems() {
    const assetsApi = 'assets/mock-items.json';

    if (this._items.length === 0) {
      this.http.get('/items')
        .subscribe((data: any) => {
          this._items = data;
          this._update.next(this._items)
        });
    }
    return this._update;
  }

  testFetchItemsWithoutCover() {
    return this.http.get('https://rickandmortyapi.com/api/character')
      .pipe(
        map((data: any) => data.results),
        catchError(errorObject => throwError(() => errorObject))
      )
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
