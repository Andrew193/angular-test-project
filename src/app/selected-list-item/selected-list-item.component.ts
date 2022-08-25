import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-selected-list-item',
  templateUrl: './selected-list-item.component.html',
  styleUrls: ['./selected-list-item.component.css']
})
export class SelectedListItemComponent implements OnInit {
  selectedListID: number = 0;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.selectedListID = +this.route.snapshot.params['id'];
  }

}
