import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { ItemsearchService } from "./itemsearch.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductresolveService {
  constructor(private router: Router, private ps: ItemsearchService) {}

  resolve(): Observable<any> {
    return this.ps.GetAllProducts().pipe(
      map(ret => {
        if (ret) {
          return ret;
        } else {
          this.router.navigate(["/error"]);
          return false;
        }
      })
    );
  }
}
