import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-for-tests',
  templateUrl: './for-tests.component.html',
  styleUrls: ['./for-tests.component.css']
})
export class ForTestsComponent {
  constructor() {
  }

  @Input("array") array!: string[];
  @Output() arrayChange = new EventEmitter<string[]>();

  arrayChangeHandler() {
    this.array.push("test");
    this.arrayChange.emit([...this.array]);
  }

}
