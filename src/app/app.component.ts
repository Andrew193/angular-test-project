import {Component, Inject, OnInit} from '@angular/core';
import {PopupService} from "./services/popup/popup.service";
import {environment} from "../environments/environment";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private popupService: PopupService) {
  }

  ngOnInit() {
    this.setupAppTheme();
  }

  setupAppTheme() {
    const themeLink = this.document.createElement("link");
    const faviconLink = this.document.createElement("link");
    const head = this.document.querySelector('head');
    //favicon
    faviconLink.rel = "icon";
    faviconLink.type = "image/x-icon";
    faviconLink.href = `./assets/css/themes/${environment.theme}/favicon.ico`;
    //theme styles
    themeLink.rel = "stylesheet";
    themeLink.type = 'text/css';
    themeLink.href = `./assets/css/themes/${environment.theme}/style.css`;
    //Add to head
    head!.appendChild(themeLink);
    head!.appendChild(faviconLink);
  }

  yesPopup() {
    this.popupService.hideModal(true);
  }

  noPopup() {
    this.popupService.hideModal(false);
  }
}
