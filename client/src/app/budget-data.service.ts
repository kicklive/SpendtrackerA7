import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { Budgetdata } from "./budgetdata";

@Injectable({
  providedIn: "root"
})
export class BudgetDataService {
  constructor(private http: HttpClient) {}

  public GetBudgetList(): Observable<any> {
    return this.http.get("/data/budgetlist");
  }

  public GetBudgetDetails(budgetId): Observable<any> {
    debugger;
    return this.http.get("/data/getdetails/", { params: { id: budgetId } });
  }

  public getNumberOFDays(budget) {
    //   debugger
    const todaysDate = new Date();
    const fromDate = new Date(todaysDate.setHours(0, 0, 0, 0));

    const fromDateRet = fromDate.setDate(fromDate.getDate());
    const toDate = new Date(budget.BudgetEndDate);
    const budgetFromDate = new Date(budget.BudgetStartDate);
    const toDateRet = toDate.setHours(0, 0, 0, 0);

    let remainingDates = 0;
    if (fromDateRet && toDate) {
      if (fromDate < budgetFromDate) {
        remainingDates = 0;
      } else {
        console.log(
          Math.round(
            (new Date(fromDate).getTime() - new Date(toDate).getTime()) /
              (24 * 60 * 60 * 1000)
          )
        );
        remainingDates = Math.round(
          Math.abs(
            (new Date(fromDate).getTime() - new Date(toDate).getTime()) /
              (24 * 60 * 60 * 1000)));

        if (
          Math.round(
            (new Date(fromDate).getTime() - new Date(toDate).getTime()) /
              (24 * 60 * 60 * 1000)) > 0) {
          remainingDates = 0;
        }
      }
      return remainingDates;
    }
  }
}
