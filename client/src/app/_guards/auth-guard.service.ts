import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AuthenticationService } from "./../authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthenticationService, private router: Router) { }
  canActivate() {
    // debugger;
    if (!this.auth.isLoggedIn()) {
      // debugger;
      this.router.navigateByUrl('/error');
      return false;
    }
    return true;
  }
}
