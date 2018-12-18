import { Component, OnInit } from '@angular/core';
import { AuthenticationService, } from "../authenticate.service";
import { TokenPayload } from "../authentication.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

credentials:TokenPayload={
email:'',
name:'',
password:''
};
  constructor(private auth:AuthenticationService,private router:Router) {

   }

   register(){
     this.auth.register(this.credentials).subscribe(()=>{
       this.router.navigateByUrl('/profile');
     },(err)=>{
console.log(err);
     })

   }
  ngOnInit() {
  }

}
