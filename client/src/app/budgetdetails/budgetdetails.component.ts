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
  public bId:string;
  public d:any;
  constructor(private service:SharedService,private bds:BudgetDataService,private route:ActivatedRoute) { 
    debugger;
    this.serviceSubscription=this.service.emmiter.subscribe({
      next:(budget_id:string)=>{
        //this.GetDetails(budget_id);
        this.bId=budget_id;
      }
    });
    //THIS WORKS ALSO...
  //   this.serviceSubscription=this.service.emmiter.subscribe((budget_id)=>{
  //     this.GetDetails(budget_id);
  // });

  }

  ngOnInit() {
    debugger;
    this.GetDetails();
    
  }

  GetDetails(){
    debugger;
  // this.d= this.route.snapshot.data;
//    this.route.data.subscribe(val=>{
//      debugger;
// const x=val;
//    });
    // this.route.data
    // .subscribe((data: { d: BudgetDetails }) => {
    //   debugger;
    //   this.budgetDetails = data.d;
    // });

    this.bds.GetBudgetDetails(this.bId).subscribe((d)=>{
      debugger;
      this.budgetDetails=d;
    });
   this.unSubscribe();
  }
  
  findDiff(budget){
    if(typeof(budget)!=undefined && budget!=null)
    return this.bds.getNumberOFDays(budget);
   }

  unSubscribe(){
    this.serviceSubscription.unsubscribe()
  }

}
