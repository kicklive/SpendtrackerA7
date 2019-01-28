import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { BudgetDataService } from "../services/budget-data.service";
import { BudgetDetails } from "../models/budgetdata";
import { bind } from "@angular/core/src/render3";
import { ActivatedRoute, Router } from "@angular/router";
import { DataresolveService } from "../services/dataresolve.service";
import { PersistanceService } from "../services/persistance.service";
import { PersistantValues } from "../models/helper";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-budgetdetails",
  templateUrl: "./budgetdetails.component.html",
  styleUrls: ["./budgetdetails.component.css"]
})
export class BudgetdetailsComponent implements OnInit {
  private serviceSubscription;
  public budgetDetails: BudgetDetails;
  public hasTransactions = false;
  public pv: PersistantValues = {
    BudgetId: "",
    message: ""
  };
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
    this.route.data.subscribe(ret => {
      debugger;
      this.ps.currentMsg.subscribe(r => {
        debugger;
        if (r.message !== "") {
          debugger;
          this.snackBar.open(r.message, "New Transaction", {
            duration: 5000
          });
        }
      });

      this.budgetDetails = ret.data;
      if (ret.data.Transactions.length > 0) {
        this.hasTransactions = true;
      }
    });
    // this.unSubscribe();
  }

  findDiff(budget) {
    return this.bds.getNumberOFDays(budget);
  }

  unSubscribe() {
    this.serviceSubscription.unsubscribe();
  }

  newTransaction(url, budgetId) {
    debugger;
    this.pv.BudgetId = budgetId;
    this.ps.changeMsg(this.pv);
    this.router.navigateByUrl(url);
  }
}
