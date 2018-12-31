import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authenticate.service";
import { NavstateService } from "../navstate.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth:AuthenticationService,private n:NavstateService) { 
    this.n.setNavBarState(true);
    this.n.setNavLinks(true);
    this.n.setUserName('');
    this.auth.logout();
  }

  ngOnInit() {
    
    
    
  }

}
