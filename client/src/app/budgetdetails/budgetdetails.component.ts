import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SharedService } from "../shared.service";
import { BudgetDataService } from "../budget-data.service";
import { BudgetDetails } from "../budgetdata";
import { bind } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from "@angular/router";
import { DataresolveService } from "../dataresolve.service";
import { PersistanceService } from "../persistance.service";


@Component({
  selector: 'app-budgetdetails',
  templateUrl: './budgetdetails.component.html',
  styleUrls: ['./budgetdetails.component.css'],

})

export class BudgetdetailsComponent implements OnInit {
  private serviceSubscription;
  public budgetDetails: BudgetDetails;
  public hasTransactions = false;
  constructor(private service: SharedService, private bds: BudgetDataService,
    private route: ActivatedRoute, private drs: DataresolveService, private router: Router, private ps: PersistanceService) {
    // don't need this private service:SharedService just leaving it in in case I may need it later.
  }

  ngOnInit() {
    //    debugger;
    this.GetDetails();
  }

  GetDetails() {
    // debugger;
    this.route.data.subscribe((ret) => {
      debugger;
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
     this.ps.changeMsg(budgetId);
     this.router.navigateByUrl(url);

  }

  Newtransaction(url, budgetId) {

  }
}
