import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoggerService} from "../services/logger-service/logger.service";
import {test} from "./test";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent {
  constructor(private route: Router, public logger: LoggerService) {
    test()
  }

  redirectToAllItems() {
    this.route.navigate(['/lists']);
  }

  createNewItem() {
    this.route.navigate(['/lists/crud/new']);
  }
}
