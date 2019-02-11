import { Component, OnInit, NgZone, ViewChild, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PersistanceService } from "../services/persistance.service";
import { PersistantValues } from "../models/helper";
import { MatSnackBar } from "@angular/material";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";
import { Transactions } from "../models/transactiondata";
import { TransactionService } from "../services/transaction.service";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";

@Component({
  selector: "app-edittransaction",
  templateUrl: "../newtransaction/newtransaction.component.html",
  styleUrls: ["./edittransaction.component.css"]
})
export class EdittransactionComponent implements OnInit, OnDestroy {
  transactionForm: FormGroup;
  pageTitle = "Edit Transaction";
  public pv: PersistantValues = {
    BudgetId: "",
    message: "",
    transId: ""
  };
  public budgetId = "";
  private persistedBudgetId: string;
  private message: string;
  private unsubscribe$ = new Subject();
  public tran: Transactions = {
    itemdescription: "",
    itemprice: "",
    store: "",
    upc: "",
    transdate: "",
    budget_id: ""
  };

  private serviceSubscription: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private ps: PersistanceService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private trans: TransactionService,
    private ngZone: NgZone
  ) {
    debugger;
    this.transactionForm = this.createForm(formBuilder);
    // const formControl = this.transactionForm.get("upc");
    // formControl.disable();
  }
  @ViewChild("autosize") autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit() {
    // debugger;
    this.getTranDetail();
  }
  createForm(fb: FormBuilder) {
    return fb.group({
      itemprice: "",
      itemdescription: "",
      transdate: "",
      store: "",
      upc: [{ value: "", disabled: true }],
      budget_id: ""
    });
  }
  getTranDetail() {
    debugger;
    this.serviceSubscription = this.route.data.subscribe(
      ret => {
        debugger;
        this.tran = ret.data;
      },
      transErr => {
        this.snackBar.open(
          this.message,
          "There was a problem retrieving data. Contact administrator.",
          {
            duration: 2500
          }
        );
      }
    );
  }
  onSubmit() {
    debugger;
    this.getBudgetId();
    this.transactionForm.patchValue({ budget_id: this.budgetId });
    const ret: Transactions = Object.assign({}, this.transactionForm.getRawValue());
    debugger;
    this.trans.AddTransaction(ret).subscribe(
      res => {
        debugger;
        if (res.ret === "success") {
          this.pv.message = res.ret;
          this.pv.BudgetId = this.budgetId;
          this.ps.changeMsg(this.pv);
          this.router.navigateByUrl("/details");
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
    this.router.navigateByUrl("/details");
  }
  clearForm() {}
  isDisabled() {
    return true;
  }
}
