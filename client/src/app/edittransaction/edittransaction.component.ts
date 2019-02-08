import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-edittransaction",
  templateUrl: "../newtransaction/newtransaction.component.html",
  styleUrls: ["./edittransaction.component.css"]
})
export class EdittransactionComponent implements OnInit {
  transactionForm: FormGroup;
  pageTitle = "Edit Transaction";
  constructor(private formBuilder: FormBuilder) {
    this.transactionForm = this.createForm(formBuilder);
  }

  ngOnInit() {}
  createForm(fb: FormBuilder) {
    return fb.group({
      itemprice: "",
      itemdescription: "",
      transdate: "",
      store: "",
      upc: "",
      budget_id: ""
    });
  }
}
