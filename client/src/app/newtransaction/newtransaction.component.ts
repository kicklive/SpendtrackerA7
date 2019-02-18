import { Component, OnInit, NgZone, ViewChild, OnDestroy } from "@angular/core";
import { Transactions } from "../models/transactiondata";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
import { ItemsearchService } from "../services/itemsearch.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { TransactionService } from "../services/transaction.service";
import { PersistanceService } from "../services/persistance.service";
import { Router } from "@angular/router";
import { PersistantValues } from "../models/helper";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";
import { MatSnackBar } from "@angular/material";
import { ValidateNumberDirective } from "../directives/validatenumber";

@Component({
  selector: "app-newtransaction",
  templateUrl: "./newtransaction.component.html",
  styleUrls: ["./newtransaction.component.css"]
})
export class NewtransactionComponent implements OnInit, OnDestroy {
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
  public pv: PersistantValues = {
    BudgetId: "",
    message: "",
    transId: ""
  };
  private serviceSubscription: Subscription;
  pageTitle = "New Transaction";
  buttonName = "Cancel";

  constructor(
    private ngZone: NgZone,
    private srch: ItemsearchService,
    private formBuilder: FormBuilder,
    private trans: TransactionService,
    private ps: PersistanceService,
    private route: Router,
    private snackBar: MatSnackBar
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
    return fb.group(
      {
        // itemprice: "",
        // itemdescription: "",
        // transdate: "",
        // store: "",
        // upc: "",
        // budget_id: ""

        itemprice: ["", Validators.required],
        itemdescription: "",
        transdate: ["", Validators.required],
        store: ["", Validators.required],
        upc: [
          "",
          [
            Validators.required,
            Validators.minLength(12),
            ValidateNumberDirective.validateNum
          ]
        ],
        transId: "",
        budget_id: ""
      },
      { updateOn: "blur" }
    );
  }

  onSubmit() {
    debugger;
    if (this.transactionForm.invalid) {
      this.snackBar.open("Failure", "Please complete the reqiuired fields.", {
        duration: 2500
      });
      return;
    }
    this.getBudgetId();
    this.transactionForm.patchValue({ budget_id: this.budgetId });
    const ret: Transactions = Object.assign({}, this.transactionForm.value);
    debugger;
    this.trans.AddTransaction(ret).subscribe(
      res => {
        debugger;
        if (res.ret === "success") {
          this.pv.message = res.ret;
          this.pv.BudgetId = this.budgetId;
          this.ps.changeMsg(this.pv);
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
    debugger;
    this.serviceSubscription = this.ps.currentMsg.subscribe(
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
  ngOnDestroy(): void {
    if (this.serviceSubscription !== undefined) {
      this.serviceSubscription.unsubscribe();
    }
  }
  goBack() {
    this.route.navigateByUrl("/details");
  }
  buttonAction() {
    this.transactionForm.reset();
  }
  get upc() {
    return this.transactionForm.get("upc");
  }
  get itemprice() {
    return this.transactionForm.get("itemprice");
  }
  get transdate() {
    return this.transactionForm.get("transdate");
  }
  get store() {
    return this.transactionForm.get("store");
  }
}
