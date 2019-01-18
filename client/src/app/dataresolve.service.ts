import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { BudgetDetails } from "./budgetdata";
import { BudgetDataService } from "./budget-data.service";
import { SharedService } from "./shared.service";
import { Observable, Subscription, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapTo, delay } from 'rxjs/operators';
import { PersistanceService } from "./persistance.service";

@Injectable()
export class DataresolveService implements Resolve<BudgetDetails>  {
	val: string;



	constructor(private bds: BudgetDataService, private router: Router, private service: SharedService, private ps: PersistanceService) {
	}

	resolve(): Observable<any> {
		this.ps.currentMsg.subscribe((ret) => {
			this.val = ret;
		});

		return this.bds.GetBudgetDetails(this.val).pipe(map((ret) => {
			debugger;
			if (ret) {
				return (ret);
			}
			else {
				this.router.navigate(['/']);
				return false;
			}
		}));

	}

	// changeMsg(m:string){
	//  // debugger;
	//   this.bs.next(m);
	// }
}
