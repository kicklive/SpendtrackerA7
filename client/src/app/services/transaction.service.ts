import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  AddTransaction(formData): Observable<any> {
    return this.http.post("/data/SaveTransaction", formData).pipe(
      map((data: any) => {
         debugger;
        return data;
      })
    );
  }
}
