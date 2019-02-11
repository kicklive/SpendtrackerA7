import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable, Subscription, of, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { PersistanceService } from "./persistance.service";
import { Transactions } from "../models/transactiondata";
import { TransactionService } from "../services/transaction.service";

@Injectable({
  providedIn: "root"
})
export class TransactionresolveService implements Resolve<Transactions> {
  constructor(
    private trans: TransactionService,
    private router: Router,
    private ps: PersistanceService
  ) {}
  val: string;
  resolve(): Observable<any> {
    debugger;
    this.ps.currentMsg.subscribe(x => {
      this.val = x.transId;
    });
    return this.trans.GetTransData(this.val).pipe(
      map(ret => {
        debugger;
        if (ret) {
          return ret;
        } else {
          this.router.navigate(["/"]);
          return false;
        }
      })
    );
  }
}
