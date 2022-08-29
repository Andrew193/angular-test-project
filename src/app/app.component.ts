import { Component } from '@angular/core';
import {PopupService} from "./services/popup/popup.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ang';

  constructor(private popupService: PopupService) {
  }

  closePopup() {
    this.popupService.hideModal();
  }
}
