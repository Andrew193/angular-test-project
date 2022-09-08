import {Component, Input, OnInit} from '@angular/core';
import {ListItemType} from "../lists/lists.component";

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})

export class ListItemComponent implements OnInit {
  @Input() item: { itemConfig: ListItemType, index: number } | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
