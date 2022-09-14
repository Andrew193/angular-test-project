import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {ListService} from "../../services/list-service/list-service.service";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {HideDirective} from "../../directives/hide/hide.directive";
import {ListAnimation} from "./listAnimation";
import {createNeItemAnimation} from "../../basic/mainPageAnimation";

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
  providers: [HideDirective],
  animations: [ListAnimation, createNeItemAnimation]
})

export class ListsComponent implements OnInit, OnDestroy {
  items: ListItemType[] = [];
  sortByIdOrder = false;
  sortByIdName = false;
  searchName = '';
  searchUpdater$: Subject<string> = new Subject<string>();
  createListPulls: 'pulls' | 'closed' = "pulls";
  animationInterval: number = 0;

  private subscriptions$: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private listService: ListService) {
  }

  navigateToListCrudPage() {
    this.router.navigate(['/lists/crud/new'])
  }

  filterList(element: any) {
    this.searchUpdater$.next(element.value)
  }

  ngOnInit(): void {
    this.getListItems();
    this.sortByIdOrder = true;
    this.sortByIdName = true;
    this.searchUpdater$.pipe(debounceTime(1000), takeUntil(this.subscriptions$))
      .subscribe((newSearchName) => this.searchName = newSearchName);
    this.animationInterval = setInterval(() => {
      this.createListPulls = this.createListPulls === "closed" ? "pulls" : "closed";
    }, 500)
  }

  getListItems(): void {
    // this.listService.testFetchItemsWithoutCover().subscribe((data) => {
    //   console.log("response", data)
    //   this.items = this.listService.getItems()
    // }, (error) => {
    //   console.log("error", error)
    //   this.items = []
    // })
    this.listService.fetchItems().pipe(takeUntil(this.subscriptions$)).subscribe((items) => {
      this.items = items
    })
  }

  ngOnDestroy() {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
    clearInterval(this.animationInterval);
  }

  showDetails(id: number): void {
    this.router.navigate(["/lists/crud", id]);
  }

  public sortById = (): void => {
    this.sortByIdOrder = !this.sortByIdOrder;
    this.items = this.items!.sort((a, b) => this.sortByIdOrder ? a.id - b.id : b.id - a.id)
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
