import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

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

export class ListsComponent implements OnInit {
  items: ListItemType[] = [];
  sortByIdOrder = false;
  sortByIdName = false;

  constructor(private router: Router) {
  }

  showDetails(id: number): void {
    this.router.navigate([`/lists/crud/${id}`]);
  }

  ngOnInit(): void {
    this.items = [{id: 1, name: "test"}, {id: 2, name: "rest"}];
    this.sortByIdOrder = true;
    this.sortByIdName = true;
  }

  public sortById = (): void => {
    this.items = this.items!.sort((a, b) => {
      this.sortByIdOrder = !this.sortByIdOrder;
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
