import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../authentication.model';
import { AuthenticationService } from '../authenticate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: UserDetails;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.profile().subscribe((user) => {
      this.details = user;
    });
  }

}
