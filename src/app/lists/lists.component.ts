import {Component, OnInit} from '@angular/core';

export type ListItemType = {
  id: number,
  name: string,
  [key: string]: any
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {
  items: ListItemType[] = [{id: 1, name: "test"}, {id: 2, name: "rest"}]

  constructor() {
  }

  ngOnInit(): void {
  }

}
