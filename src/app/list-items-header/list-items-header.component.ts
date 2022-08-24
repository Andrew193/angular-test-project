import {Component, Input, OnInit} from '@angular/core';
import {voidReturnVoidPassFunction} from "../basic-types";

@Component({
  selector: 'app-list-items-header',
  templateUrl: './list-items-header.component.html',
  styleUrls: ['./list-items-header.component.css']
})
export class ListItemsHeaderComponent implements OnInit {

  @Input("sortById") sortById: voidReturnVoidPassFunction = () => {
  }
  @Input("sortByName") sortByName: voidReturnVoidPassFunction = () => {
  }
  @Input("sortByIdOrder") sortByIdOrder: boolean | undefined;
  @Input("sortByIdName") sortByIdName: boolean | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
