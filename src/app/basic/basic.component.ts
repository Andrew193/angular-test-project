import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoggerService} from "../services/logger-service/logger.service";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent {
  constructor(private route: Router, public logger: LoggerService) {
  }
  redirectToAllItems() {
    this.route.navigate(['/lists']);
  }

  createNewItem() {
    this.route.navigate(['/lists/crud/new']);
  }

}
