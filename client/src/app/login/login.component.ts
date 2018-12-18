import { Component, OnInit } from '@angular/core';
import { AuthenticateService, } from "../authenticate.service";
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
  

  constructor(private auth:AuthenticateService,private router:Router) { }

  login(){
    this.auth.login(this.credentials).subscribe(()=>{
      this.router.navigateByUrl('/profile');
    },(err)=>{
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
