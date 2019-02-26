import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parenttest",
  // templateUrl: './parenttest.component.html',
  template: `
    <app-childetest (valueChanged)="displayCounter($event)"></app-childetest>
  `,
  styleUrls: ["./parenttest.component.css"]
})
export class ParenttestComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
  displayCounter(num) {
    console.log(num);
  }
}
