import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductdataService {
  constructor(private http: HttpClient) {}

  public GetAllProducts(): Observable<any> {
    return this.http.get("/data/searchallitems");
  }
}
