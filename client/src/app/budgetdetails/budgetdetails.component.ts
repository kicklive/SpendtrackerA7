import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SharedService } from "../shared.service";
import { BudgetDataService } from "../budget-data.service";
import { BudgetDetails } from "../budgetdata";
import { bind } from '@angular/core/src/render3';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-budgetdetails',
  templateUrl: './budgetdetails.component.html',
  styleUrls: ['./budgetdetails.component.css'],

})

export class BudgetdetailsComponent implements OnInit {
  private serviceSubscription;
  public budgetDetails:BudgetDetails;
  constructor(private service:SharedService,private bds:BudgetDataService,private route:ActivatedRoute) { //don't need this private service:SharedService just leaving it in in case I may need it later.
    // debugger;
    // this.serviceSubscription=this.service.emmiter.subscribe({
    //   next:(budget_id:string)=>{
    //     //this.GetDetails(budget_id);
    //     this.bId=budget_id;
    //   }
    // });
    //THIS WORKS ALSO...
  //   this.serviceSubscription=this.service.emmiter.subscribe((budget_id)=>{
  //     this.GetDetails(budget_id);
  // });
  }

  ngOnInit() {
//    debugger;
    this.GetDetails();
  }

  GetDetails(){
	//debugger;
	this.route.data.subscribe((ret)=>{
		debugger;
		this.budgetDetails=ret.data;
	});
  // this.unSubscribe();
  }
  
  findDiff(budget){
	return this.bds.getNumberOFDays(budget);
   }

  unSubscribe(){
    this.serviceSubscription.unsubscribe()
  }

}
