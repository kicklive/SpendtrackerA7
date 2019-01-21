import { Component, OnInit } from '@angular/core';
import { AuthenticationService, } from "../services/authenticate.service";
import { TokenPayload } from "../services/authentication.model";
import { Router } from "@angular/router";
import { NavstateService } from "../services/navstate.service";


export interface Roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    role: ''
  };
  UserRoles;
  roles: Roles[] = [
    { value: '1', viewValue: 'Admin' },
    { value: '2', viewValue: 'User' }
  ];

  constructor(private auth: AuthenticationService, private router: Router, private n: NavstateService) {

  }

  register() {
    // debugger;
    this.credentials.role = this.credentials.role;
    this.auth.register(this.credentials).subscribe(() => {
      this.n.setUserName('Hello, ' + this.auth.getUsername());
      this.n.setNavBarState(false);
      this.n.setNavLinks(false);
      this.router.navigateByUrl('/ST', { skipLocationChange: true });
    }, (err) => {
      console.log(err);
    });

  }
  ngOnInit() {
  }

}
