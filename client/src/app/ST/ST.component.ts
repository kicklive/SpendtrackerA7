import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../authenticate.service";
import { UserDetails } from "../authentication.model";
import { NavstateService } from "../navstate.service";

interface pageRoute{
  name:string,
  route:string,
  description:string,
  buttontext:string
  imagepath:string
  };


@Component({
  selector: 'app-ST',
  templateUrl: './ST.component.html',
  styleUrls: ['./ST.component.css']
})
export class STComponent implements OnInit {

  title = 'client';
  greeting='';
  userDetails:UserDetails;
  userName:string;

  routes:pageRoute[]=[];  
constructor(private auth:AuthenticationService,private n:NavstateService){
  this.n.setNavBarState(false);
  this.n.setUserName('Hello, '+this.auth.getUsername());
  this.n.setNavLinks(true);

}
 

  ngOnInit() {
    this.routes=[
      {name:'Budget List',route:'/listbudgets',description:'Show all created budgets',buttontext:'Go To Budgets',imagepath:'../../assets/images/budgetcolor.png'},
      {name:'Search Items',route:'/search',description:'Search for purchased items',buttontext:'Go To Search',imagepath:'../../assets/images/searchcolor.png'},
      {name:'History',route:'/history',description:'Show transaction history',buttontext:'Go To History',imagepath:'../../assets/images/historycolor.png'},
      {name:'Trends',route:'/trends',description:'Show spending trends',buttontext:'Go To Trends',imagepath:'../../assets/images/trendscolor.png'},
      {name:'About',route:'/about',description:'About this app',buttontext:'Go To About',imagepath:'../../assets/images/aboutcolor.png'},
    ];
  }

}
