import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { BudgetDetails } from "../models/budgetdata";
import { BudgetDataService } from "./budget-data.service";
import { SharedService } from "./shared.service";
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapTo, delay } from 'rxjs/operators';
import { PersistanceService } from "./persistance.service";

@Injectable()
export class DataresolveService implements Resolve<BudgetDetails>  {
    val: string;



    constructor(private bds: BudgetDataService, private router: Router, private service: SharedService, private ps: PersistanceService) {}
    resolve(): Observable<any> {
        debugger;
        this.ps.currentMsg.subscribe((x) => {
            this.val = x;
        });
        return this.bds.GetBudgetDetails(this.val).pipe(map((ret) => {
            debugger;
            if (ret) {
                return (ret);
            } else {
                this.router.navigate(['/']);
                return false;
            }
        }));

    }

}
