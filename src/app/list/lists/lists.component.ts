import {Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ListService} from "../../services/list-service/list-service.service";
import {debounceTime, Subject, Subscription} from "rxjs";
import {HideDirective} from "../../directives/hide/hide.directive";

export type ListItemType = {
  id: number,
  name: string,
  [key: string]: any,
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [HideDirective]
})

export class ListsComponent implements OnInit, OnDestroy {
  items: ListItemType[] = [];
  sortByIdOrder = false;
  sortByIdName = false;
  searchName = '';
  searchUpdater$: Subject<string> = new Subject<string>();

  private itemsSubscription: Subscription = new Subscription();

  constructor(private router: Router, private listService: ListService) {
  }

  filterList(element: any) {
    console.log(element!.value)
    this.searchUpdater$.next(element.value)
  }

  ngOnInit(): void {
    this.getListItems();
    this.sortByIdOrder = true;
    this.sortByIdName = true;
    this.searchUpdater$.pipe(debounceTime(1000))
      .subscribe((newSearchName) => {
        console.log("test", newSearchName)
        this.searchName = newSearchName;
      })
  }

  getListItems(): void {
    // this.listService.testFetchItemsWithoutCover().subscribe((data) => {
    //   console.log("response", data)
    //   this.items = this.listService.getItems()
    // }, (error) => {
    //   console.log("error", error)
    //   this.items = []
    // })
    this.itemsSubscription = this.listService.fetchItems().subscribe(() => this.items = this.listService.getItems())
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe()
  }

  showDetails(id: number): void {
    this.router.navigate(["/lists/crud", id]);
  }

  public sortById = (): void => {
    this.sortByIdOrder = !this.sortByIdOrder;
    this.items = this.items!.sort((a, b) => {
      return this.sortByIdOrder ? a.id - b.id : b.id - a.id;
    })
  }

  public sortByName = (): void => {
    this.items = this.items!.sort((a, b) => {
      this.sortByIdName = !this.sortByIdName;
      if (a.name < b.name)
        return this.sortByIdName ? -1 : 1;
      if (a.name > b.name)
        return this.sortByIdName ? 1 : -1;
      return 0;
    })
  }
}
