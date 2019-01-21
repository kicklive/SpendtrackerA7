import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  AddTransaction(formData): Observable<any> {
    const xx = this.http.post("/data/SaveTransaction", formData);
    debugger;
    return xx;
  }
}
