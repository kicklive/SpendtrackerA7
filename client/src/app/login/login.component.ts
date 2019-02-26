import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authenticate.service";
import { TokenPayload, UserDetails } from "../services/authentication.model";
import { Router } from "@angular/router";
import { NavstateService } from "../services/navstate.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    password: ""
  };
  public message = "";
  userDetails: UserDetails;
  loginform: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private n: NavstateService,
    private fb: FormBuilder
  ) {
    // this.loginform = this.createForm(fb);
  }

  login() {
<<<<<<< HEAD
    // if (this.loginform.invalid) {
    //   return;
    // }
    debugger;
    this.message = "";
    this.auth.login(this.credentials).subscribe(
      res => {
        this.n.setNavBarState(false);
        this.n.setUserName("Hello, " + this.auth.getUsername());
        this.router.navigateByUrl("/ST", { skipLocationChange: true });
      },
      err => {
        debugger;
        console.log("this is the error==>" + err);
        this.message =
          "There was a problem with the registration. Contact administrator. " +
          err;
        this.router.navigateByUrl("/login");
      }
    );
=======
     debugger;
    this.message = '';
    this.auth.login(this.credentials).subscribe((res) => {
      this.n.setNavBarState(false);
      this.n.setUserName('Hello, ' + this.auth.getUsername());
      //this.router.navigateByUrl('/ST', { skipLocationChange: true });
    }, (err) => { debugger;
      console.log('this is the error==>' + err);
      this.message = "There was a problem with the registration. Contact administrator. " + err;
    });
>>>>>>> 0aa96400956e719c18567584d3934fe294f1e3bc
  }

  ngOnInit() {
    this.loginform = this.fb.group({
      email: ["", Validators.required],
      password: ["", [Validators.required, Validators.email]]
    });
  }
  // createForm(fb: FormBuilder) {
  //   return fb.group(
  //     {
  //       email: ["", Validators.required],
  //       password: ["", [Validators.required, Validators.email]]
  //     },
  //     { updateOn: "blur" }
  //   );
  // }
  get frm() {
    return this.loginform.controls;
  }
}
