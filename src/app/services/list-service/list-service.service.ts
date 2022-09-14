import {Injectable} from '@angular/core';
import {ListItemType} from "../../list/lists/lists.component";
import {BehaviorSubject, catchError, map, Subject, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private _items: ListItemType[] = [];
  _updateItems: BehaviorSubject<ListItemType[]> = new BehaviorSubject<ListItemType[]>(this._items);

  constructor(private http: HttpClient) {
    this.fetchItems();
  }

  fetchItemById(id: number) {
    return this.http.get(`/items/${id}`)
  }

  deleteItemById(id: number) {
    return this.http.delete(`/items/${id}`)
  }

  fetchItems() {
    const assetsApi = 'assets/mock-items.json';
    this.http.get('/items')
      .subscribe((data: any) => {
        this._items = data;
        this._updateItems.next(this._items)
      });

    return this._updateItems;
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

  updateItemByIdApiCall(listItem: ListItemType) {
    return this.http.put(`/items/${listItem.id}`, listItem)
  }

  getItems(): ListItemType[] {
    return this._items;
  }

  getItemsLength(): number {
    return this._items.length;
  }
}
