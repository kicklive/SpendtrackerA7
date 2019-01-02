import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authenticate.service';
import { UserDetails,TokenPayload,TokenResponse } from "../authentication.model";
import { Router } from "@angular/router";
import { NavstateService } from "../navstate.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthenticationService,private route:Router,private n:NavstateService) { 
    //debugger;
    if(this.auth.isLoggedIn()){
      this.n.setNavBarState(false);
      this.n.setNavLinks(false);
      this.n.setUserName('Hello, '+this.auth.getUsername());
    }
      else
      this.n.setNavBarState(true);
      this.n.setNavLinks(true);
}

  ngOnInit() {
    //debugger;
    if(this.auth.isLoggedIn()){
      this.route.navigateByUrl('/ST',{skipLocationChange:true});
    }

  }
  

//   constructor(private auth:AuthenticationService,private route:Router,private n:NavstateService) { 
//     //debugger;
//     if(this.auth.isLoggedIn()){
//       this.n.setNavBarState(false);
//       this.n.setUserName('Hello, '+this.auth.getUsername());
//     }
//       else
//       this.n.setNavBarState(true);
// }

//   ngOnInit() {
//     //debugger;
//     if(this.auth.isLoggedIn()){
//       this.route.navigate(['/listbudgets']);
//     }

//   }

}
