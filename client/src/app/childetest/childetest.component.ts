import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-childetest",
  templateUrl: "./childetest.component.html",
  styleUrls: ["./childetest.component.css"]
})
export class ChildetestComponent implements OnInit {
  @Output() valueChanged = new EventEmitter();
  counter = 0;
  constructor() {}

  ngOnInit() {}

  handleclick() {
    console.log("hey, I am clicked in child");
  }

  vc() {
    this.counter++;
    this.valueChanged.emit(this.counter);
  }
}
