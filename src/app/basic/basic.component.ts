import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  constructor(private route: Router) { }

  redirectToAllItems() {
    this.route.navigate(['/lists']);
  }

  createNewItem() {
    this.route.navigate(['/lists/crud/new']);
  }

  ngOnInit(): void {
  }

}
