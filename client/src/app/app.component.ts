import { Component } from "@angular/core";
import { AuthenticationService } from "./services/authenticate.service";
import { UserDetails } from "./services/authentication.model";
import { NavstateService } from "./services/navstate.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [NavstateService]
})
export class AppComponent {
  title = "client";
  show?: boolean;
  linkshow?: boolean;
  userDetails: UserDetails;
  userName: string;
  greeting: string;
  constructor(private auth: AuthenticationService, private n: NavstateService) {
    n.navState$.subscribe(state => (this.show = state));
    n.userName$.subscribe(user => (this.greeting = user));
    n.navLinks$.subscribe(linkstate => (this.linkshow = linkstate));
  }

 // ngOnInit() {}
}
