import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ListService} from "../services/list-service/list-service.service";
import {Subscription} from "rxjs";

export type ListItemType = {
  id: number,
  name: string,
  [key: string]: any,
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  // encapsulation: ViewEncapsulation.None,
})

export class ListsComponent implements OnInit, OnDestroy {
  items: ListItemType[] = [];
  sortByIdOrder = false;
  sortByIdName = false;
  private itemsSubscription: Subscription = new Subscription();

  constructor(private router: Router, private listService: ListService) {
  }

  getListItems(): void {
    //  this.listService.testFetchItemsWithoutCover().subscribe((data) => this.items = data)
    this.itemsSubscription = this.listService.fetchItems().subscribe(() => this.items = this.listService.getItems())
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe()
  }

  showDetails(id: number): void {
    this.router.navigate(["/lists/crud", id]);
  }

  ngOnInit(): void {
    this.getListItems();
    this.sortByIdOrder = true;
    this.sortByIdName = true;
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
