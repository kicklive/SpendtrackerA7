import { Injectable } from "@angular/core";
import { Observable, Subscription, of, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PersistanceService {
  private bs = new BehaviorSubject<string>("");
  currentMsg = this.bs.asObservable();

  constructor() {}

  changeMsg(m: string) {
    // debugger;
    this.bs.next(m);
  }
}
