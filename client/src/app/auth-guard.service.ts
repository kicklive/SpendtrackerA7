import { Injectable } from '@angular/core';
import { Router,CanActivate } from "@angular/router";
import { AuthenticateService } from "./authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth:AuthenticateService,private router:Router) { }
  canActivate(){
    if(!this.auth.isLoggedIn()){
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
