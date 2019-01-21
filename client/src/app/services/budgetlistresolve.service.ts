import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { BudgetDataService } from "./budget-data.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class BudgetlistresolveService {


  constructor(private bds: BudgetDataService, private router: Router) { }

  resolve(): Observable<any> {
    debugger;
    return this.bds.GetBudgetList().pipe(map((ret) => {
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
