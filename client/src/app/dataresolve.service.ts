import { Injectable } from '@angular/core';
import { Router,Resolve,ActivatedRouteSnapshot } from "@angular/router";
import { BudgetDetails } from "./budgetdata";
import { BudgetDataService } from "./budget-data.service";
import { SharedService } from "./shared.service";
import { Observable, Subscription,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapTo, delay } from 'rxjs/operators';

@Injectable()
export class DataresolveService implements Resolve<BudgetDetails>{
  private serviceSubscription;
  private id:string;
  constructor(private bds:BudgetDataService, private router:Router,private service:SharedService) {
    this.serviceSubscription=this.service.emmiter.subscribe({
      next:(budget_id:string)=>{
        debugger;
        //this.GetDetails(budget_id);
        this.id=budget_id;
      }
    });
   }
  resolve(route:ActivatedRouteSnapshot):Observable<any>{
  //  delay(2000);
  debugger;
  return of(this.bds.GetBudgetDetails(this.id));
    // return this.bds.GetBudgetDetails(this.id).pipe(map((ret)=>{
    //   debugger;
    //   if(ret){
    //     return ret;
    //   }
    //   else{
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // }));
  }
}
