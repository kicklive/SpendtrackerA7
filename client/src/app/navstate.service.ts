import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavstateService {

  constructor() { }
  private navStateSource = new Subject<boolean>();
  private userSource=new Subject<string>()
  private navLinks=new Subject<boolean>()

  navState$ = this.navStateSource.asObservable();
  userName$=this.userSource.asObservable()
  navLinks$=this.navLinks.asObservable()

setNavBarState( state: boolean ) {
  this.navStateSource.next( state );
}

setUserName(u:string){
  this.userSource.next(u);
}

setNavLinks(linkstate:boolean){
  this.navLinks.next(linkstate);
}

}
