import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../services/authenticate.service";
import { UserDetails } from "../services/authentication.model";
import { NavstateService } from "../services/navstate.service";

@Component({
  selector: "app-trends",
  templateUrl: "./trends.component.html",
  styleUrls: ["./trends.component.css"]
})
export class TrendsComponent implements OnInit {
  constructor(private auth: AuthenticationService, private n: NavstateService) {
    this.n.setNavBarState(false);
    this.n.setUserName("Hello, " + this.auth.getUsername());
    this.n.setNavLinks(false);
  }

  ngOnInit() {}
}
