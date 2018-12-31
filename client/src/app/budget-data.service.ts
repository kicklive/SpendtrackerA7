import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Budgetdata } from "./budgetdata";

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  constructor(private http:HttpClient) {}

 public getBudgetList():Observable<any> {
    return this.http.get('/data/budgetlist');
    }

}
