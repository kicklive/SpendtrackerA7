import { Component, OnInit } from '@angular/core';
import { AuthenticationService, } from "../services/authenticate.service";
import { TokenPayload, UserDetails } from "../services/authentication.model";
import { Router } from "@angular/router";
import { NavstateService } from "../services/navstate.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  public message = '';
  userDetails: UserDetails;

  constructor(private auth: AuthenticationService, private router: Router, private n: NavstateService) {
  }

  login() {
    // debugger;
    this.message = '';
    this.auth.login(this.credentials).subscribe((res) => {
      this.n.setNavBarState(false);
      this.n.setUserName('Hello, ' + this.auth.getUsername());
      this.router.navigateByUrl('/ST', { skipLocationChange: true });
    }, (err) => {// debugger;
      console.log('this is the error==>' + err);
      this.message = "There was a problem with the registration. Contact administrator. " + err;
    });
  }

  ngOnInit() {
  }

}
