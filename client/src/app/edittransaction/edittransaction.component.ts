import { Component, OnInit, NgZone, ViewChild, OnDestroy } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
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
  buttonName = "Delete";
  public pv: PersistantValues = {
    BudgetId: "",
    message: "",
    transId: ""
  };
  public budgetId = "";
  public transId = "";
  private persistedBudgetId: string;
  private message: string;
  private unsubscribe$ = new Subject();
  public tran: Transactions = {
    itemdescription: "",
    itemprice: "",
    store: "",
    upc: "",
    transdate: "",
    transId: "",
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
      itemprice: ["", Validators.required],
      itemdescription: "",
      transdate: ["", Validators.required],
      store: ["", Validators.required],
      upc: [{ value: "", disabled: true }],
      transId: "",
      budget_id: ""
    });
  }
  getTranDetail() {
    debugger;
    this.serviceSubscription = this.route.data.subscribe(
      ret => {
        debugger;
        this.tran = ret.data;
        this.transactionForm
          .get("itemdescription")
          .setValue(ret.data.itemdescription);
        this.transactionForm.get("itemprice").setValue(ret.data.itemprice);
        this.transactionForm.get("upc").setValue(ret.data.upc);
        this.transactionForm.get("store").setValue(ret.data.store);
        this.transactionForm.get("transdate").setValue(ret.data.transdate);
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
    if (this.transactionForm.invalid) {
      this.snackBar.open("Failure", "Please complete the reqiuired fields.", {
        duration: 2500
      });
      return;
    }
    this.getBudgetId();
    this.transactionForm.patchValue({ transId: this.transId });
    const ret: Transactions = Object.assign(
      {},
      this.transactionForm.getRawValue()
    );
    debugger;
    this.trans.SaveModifiedTrans(ret).subscribe(
      res => {
        debugger;
        if (res.ret === "success") {
          this.pv.message = res.ret;
          this.pv.BudgetId = this.budgetId;
          this.pv.transId = this.transId;
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
        this.transId = ret.transId;
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
  buttonAction() {}
  isDisabled() {
    return true;
  }
}
