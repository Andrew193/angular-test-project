import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-selected-list-item',
  templateUrl: './selected-list-item.component.html',
  styleUrls: ['./selected-list-item.component.css']
})
export class SelectedListItemComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let listID = +this.route.snapshot.params['id'];
    console.log(listID);
  }

}
