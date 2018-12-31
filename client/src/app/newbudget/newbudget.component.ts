import { Component, OnInit } from '@angular/core';
import { Budgetdata } from "../budgetdata";
import { BudgetDataService } from '../budget-data.service';
import { Router } from "@angular/router";
import { buildDriverProvider } from 'protractor/built/driverProviders';

export interface BudgetType{
  text:string,
  value:string
}
@Component({
  selector: 'app-newbudget',
  templateUrl: './newbudget.component.html',
  styleUrls: ['./newbudget.component.css']
})

export class NewbudgetComponent implements OnInit {
  nb:Budgetdata={
    BudgetStartDate:'',
    BudgetEndDate:'',
    BudgetAmount:'',
    BudgetStatus:'',
    BudgetType:''
  };
  budgetTypes:BudgetType[]=[
    {text:'Amex',value:'1'},
    {text:'Visa',value:'2'},
    {text:'MC',value:'3'},
    {text:'Cash',value:'4'},
  ]

  constructor(private ds:BudgetDataService,private route:Router) { }

  ngOnInit() {
    
  }

}
