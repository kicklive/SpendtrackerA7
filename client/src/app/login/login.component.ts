import { Component, OnInit } from '@angular/core';
import { AuthenticationService, } from "../authenticate.service";
import { TokenPayload } from "../authentication.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials:TokenPayload={
    email:'',
    password:''
    };
  public message='';

  constructor(private auth:AuthenticationService,private router:Router) { }

  login(){
    //debugger;
    this.message='';
    this.auth.login(this.credentials).subscribe((res)=>{
      this.router.navigateByUrl('/ListBudges');
    },(err)=>{debugger;
      console.log('this is the error==>'+err);
      this.message="Username/password incorrect "+err;
    })
  }

  ngOnInit() {
  }

}
