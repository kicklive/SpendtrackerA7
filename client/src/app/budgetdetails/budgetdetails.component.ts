import { Component, OnInit } from '@angular/core';
import { SharedService } from "../shared.service";
import { BudgetDataService } from "../budget-data.service";
import { BudgetDetails } from "../budgetdata";
import { bind } from '@angular/core/src/render3';

@Component({
  selector: 'app-budgetdetails',
  templateUrl: './budgetdetails.component.html',
  styleUrls: ['./budgetdetails.component.css']
})
export class BudgetdetailsComponent implements OnInit {
  private serviceSubscription;
  public budgetDetails:BudgetDetails;
  public x:string;
  constructor(private service:SharedService,private bds:BudgetDataService) { 
    debugger;
    this.serviceSubscription=this.service.emmiter.subscribe({
      next:(budget_id:string)=>{
        //this.GetDetails(budget_id);
        this.x=budget_id;
      }
    });
    //THIS WORKS ALSO...
  //   this.serviceSubscription=this.service.emmiter.subscribe((budget_id)=>{
  //     this.GetDetails(budget_id);
  // });

  }

  ngOnInit() {
    this.GetDetails(this.x)
  }

  GetDetails(bId){
    this.bds.GetBudgetDetails(bId).subscribe((d)=>{
      debugger;
      this.budgetDetails=d;
    });
  //  this.unSubscribe();
  }

  unSubscribe(){
    this.serviceSubscription.unsubscribe()
  }

}
