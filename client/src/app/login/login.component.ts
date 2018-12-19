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
  

  constructor(private auth:AuthenticationService,private router:Router) { }

  login(){
    debugger;
    this.auth.login(this.credentials).subscribe((res)=>{
      this.router.navigateByUrl('/profile');
    },(err)=>{
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
