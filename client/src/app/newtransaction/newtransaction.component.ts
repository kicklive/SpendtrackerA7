import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { BudgetTransactions } from '../budgetdata';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-newtransaction',
  templateUrl: './newtransaction.component.html',
  styleUrls: ['./newtransaction.component.css']
})
export class NewtransactionComponent implements OnInit {
  trans: BudgetTransactions = {
    itemdescription: '',
    itemprice: '',
    transdate: '',
    store: '',
    upc: ''
  };
  isValid = false;
  constructor(private ngZone: NgZone) { }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit() {
  }

}
