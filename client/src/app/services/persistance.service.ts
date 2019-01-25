import { Injectable } from "@angular/core";
import { Observable, Subscription, of, BehaviorSubject } from "rxjs";
import { PersistantValues } from "../models/helper";

@Injectable({
  providedIn: "root"
})
export class PersistanceService {
  private bs = new BehaviorSubject<PersistantValues>(null);
  currentMsg = this.bs.asObservable();
  private pv: PersistantValues;

  constructor() {}

  // changeMsg(m: string) {
  //   // debugger;
  //   this.bs.next(m);
  // }

  changeMsg<T>(m: PersistantValues) {
    // debugger;
    this.bs.next(m);
  }
}
