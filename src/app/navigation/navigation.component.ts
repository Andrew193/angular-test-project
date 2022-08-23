import {Component, OnInit} from '@angular/core';
import {routes} from "../app-routing.module";
import {Routes} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  NavigationRoutes: Routes = [];

  constructor() {
  }

  ngOnInit(): void {
    this.NavigationRoutes = routes.slice(0, routes?.length - 1)
  }

}
