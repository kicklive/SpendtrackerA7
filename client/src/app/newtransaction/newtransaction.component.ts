import { Component, OnInit, NgZone, ViewChild } from "@angular/core";
import { Transactions } from "../models/transactiondata";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { Subject } from "rxjs";
import { ItemsearchService } from "../services/itemsearch.service";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { TransactionService } from "../services/transaction.service";
import { PersistanceService } from "../services/persistance.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-newtransaction",
  templateUrl: "./newtransaction.component.html",
  styleUrls: ["./newtransaction.component.css"]
})
export class NewtransactionComponent implements OnInit {
  // trans: BudgetTransactions = {
  //   itemdescription: "",
  //   itemprice: "",
  //   transdate: "",
  //   store: "",
  //   upc: ""
  // };
  transactionForm: FormGroup;
  upcSearch$ = new Subject<string>();
  isValid = false;
  budgetId = "";
  constructor(
    private ngZone: NgZone,
    private srch: ItemsearchService,
    private formBuilder: FormBuilder,
    private trans: TransactionService,
    private ps: PersistanceService,
    private route: Router
  ) {
    debugger;
    this.transactionForm = this.createForm(formBuilder);
    this.upcSearch$.subscribe(ret => {
      if (ret.length === 12) {
        debugger;
        this.srch.SearchForItem(ret).subscribe(res => {
          debugger;
          this.transactionForm.patchValue({
            itemdescription: res
          });
        });
      }
    });
  }

  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
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

  onSubmit() {
    debugger;
    this.getBudgetId();
    this.transactionForm.patchValue({ budget_id: this.budgetId });
    const ret: Transactions = Object.assign({}, this.transactionForm.value);
    debugger;
    this.trans.AddTransaction(ret).subscribe(
      res => {
        debugger;
        if (res.ret === "success") {
          this.route.navigateByUrl("/details");
        }
      },
      err => {
        debugger;
        console.error("in onSubmit()==> " + err);
      }
    );
  }
  getBudgetId() {
    this.ps.currentMsg.subscribe(
      ret => {
        debugger;
        this.budgetId = ret.BudgetId;
      },
      err => {
        debugger;
        console.error(err);
      }
    );
  }
}
