import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from "@angular/core";
import { SharedService } from "../services/shared.service";
import { BudgetDataService } from "../services/budget-data.service";
import { BudgetDetails } from "../models/budgetdata";
import { bind } from "@angular/core/src/render3";
import { ActivatedRoute, Router } from "@angular/router";
import { DataresolveService } from "../services/dataresolve.service";
import { PersistanceService } from "../services/persistance.service";
import { PersistantValues } from "../models/helper";
import { MatSnackBar } from "@angular/material";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: "app-budgetdetails",
  templateUrl: "./budgetdetails.component.html",
  styleUrls: ["./budgetdetails.component.css"]
})
export class BudgetdetailsComponent implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;
  public budgetDetails: BudgetDetails;
  public hasTransactions = false;
  public pv: PersistantValues = {
    BudgetId: "",
    message: "",
    transId: ""
  };

  displayedColumns = [
    "transdate",
    "upc",
    "itemprice",
    "itemdescription",
    "store"
  ];
  private persistedBudgetId: string;
  private message: string;
  private tranId: string;
  private unsubscribe$ = new Subject();
  // public messages<string>: any;
  constructor(
    private service: SharedService,
    private bds: BudgetDataService,
    private route: ActivatedRoute,
    private drs: DataresolveService,
    private router: Router,
    private ps: PersistanceService,
    private snackBar: MatSnackBar
  ) {
    // don't need this private service:SharedService just leaving it in in case I may need it later.
  }

  ngOnInit() {
    //    debugger;

    this.GetDetails();
  }

  GetDetails() {
    // debugger;
    this.serviceSubscription = this.route.data.subscribe(
      ret => {
        debugger;
        this.ps.currentMsg.subscribe(
          r => {
            debugger;
            this.message = r.message;
            this.persistedBudgetId = r.BudgetId;
          },
          err => {
            this.message =
              "There was and issue saving the transaction. Contact administrator.";
          }
        );
        this.budgetDetails = ret.data;
        if (ret.data.Transactions.length > 0) {
          this.hasTransactions = true;
        }
        if (this.message !== "") {
          debugger;
          this.snackBar.open(
            this.message,
            "Transaction saved successfully.",
            {
              duration: 2500
            }
          );
        }
      },
      transErr => {
        this.snackBar.open(this.message, "Error", {
          duration: 2500
        });
      }
    );
  }

  findDiff(budget) {
    return this.bds.getNumberOFDays(budget);
  }

  unSubscribe() {
    debugger;
    this.serviceSubscription.unsubscribe();
  }

  newTransaction(url, budgetId) {
    debugger;
    this.pv.BudgetId = budgetId;
    this.ps.changeMsg(this.pv);
    this.router.navigateByUrl(url);
  }
  ngOnDestroy() {
    this.unSubscribe();
  }

  showTransDetails(url: string, transId: string) {
    debugger;
    this.pv.transId = transId;
    this.pv.BudgetId = this.persistedBudgetId;
    this.ps.changeMsg(this.pv);
    this.router.navigateByUrl(url);
  }
}
