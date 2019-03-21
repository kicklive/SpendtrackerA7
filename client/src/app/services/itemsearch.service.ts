import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ItemsearchService {

  constructor(private http: HttpClient) { }

  public SearchForItem(upc): Observable<any> {
    return this.http.get("/data/itemsearch", { params: { id: upc } });
  }
  public SearchForItemById(id): Observable<any> {
    return this.http.get("/data/itemsearchbyid", { params: { id: id } });
  }
  public GetAllProducts(): Observable<any> {
    return this.http.get("/data/searchallitems");
  }
}


