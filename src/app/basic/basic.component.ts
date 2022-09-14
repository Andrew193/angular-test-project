import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoggerService} from "../services/logger-service/logger.service";
import {testFile} from "./testFile";
import {createNeItemAnimation} from "./mainPageAnimation";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css'],
  animations: [createNeItemAnimation]
})
export class BasicComponent implements OnInit, OnDestroy {
  createListPulls: 'pulls' | 'closed' = "pulls";
  animationInterval: number = 0;

  constructor(private route: Router, public logger: LoggerService) {
    testFile()
  }

  ngOnInit() {
    this.animationInterval = setInterval(() => {
      this.createListPulls = this.createListPulls === "closed" ? "pulls" : "closed";
    }, 500)
  }

  ngOnDestroy() {
    clearInterval(this.animationInterval);
  }

  redirectToAllItems() {
    this.route.navigate(['/lists']);
  }

  createNewItem() {
    this.route.navigate(['/lists/crud/new']);
  }
}
