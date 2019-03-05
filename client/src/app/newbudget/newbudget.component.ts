import { Component, OnInit } from "@angular/core";
import { Budgetdata } from "../models/budgetdata";
import { BudgetDataService } from "../services/budget-data.service";
import { Router } from "@angular/router";
import { buildDriverProvider } from "protractor/built/driverProviders";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ValidatecurrencyDirective } from "../directives/validatecurrency.directive";
import { ValidateDateDirective } from "../directives/validatedate";
import { CurrencyPipe } from "@angular/common";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";
import { first } from "rxjs/operators";

export interface BudgetType {
  text: string;
  value: string;
}
@Component({
  selector: "app-newbudget",
  templateUrl: "./newbudget.component.html",
  styleUrls: ["./newbudget.component.css"]
})
export class NewbudgetComponent implements OnInit {
  nb: Budgetdata = {
    _id: "",
    BudgetStartDate: "",
    BudgetEndDate: "",
    BudgetAmount: "",
    BudgetStatus: "",
    BudgetType: ""
  };
  budgetTypes: BudgetType[] = [
    { text: "Amex", value: "1" },
    { text: "Visa", value: "2" },
    { text: "MC", value: "3" },
    { text: "Cash", value: "4" }
  ];
  newBudgetForm: FormGroup;
  convertCurrency$ = new Subject<string>();
  constructor(
    private ds: BudgetDataService,
    private route: Router,
    private fb: FormBuilder //
  ) {
    this.newBudgetForm = this.createForm(fb);

    this.convertCurrency$.subscribe(ret => {
      if (ret.length > 0) {
        const firstChar = ret.substring(0, 1);
        if (firstChar !== "$" && Number(firstChar) !== NaN) {
          const currencyNum = new CurrencyPipe("en-US").transform(
            ret,
            "USD",
            "symbol",
            "1.0-0"
          );
          this.newBudgetForm.patchValue({ BudgetAmount: currencyNum });
        }
      }
    });
    // this.newBudgetForm.valueChanges.subscribe(val => {
    //   debugger;
    //   if (typeof val.BudgetAmount === "string") {
    //     const currencyNum = new CurrencyPipe("en-US").transform(
    //       val.BudgetAmount,
    //       "USD",
    //       "symbol",
    //       "1.2-2"
    //     );
    //     if (val.BudgetAmount !== currencyNum) {
    //       this.newBudgetForm.patchValue({ BudgetAmount: currencyNum });
    //     }
    //   }
    // });
  }

  ngOnInit() {}

  createForm(fb: FormBuilder) {
    return fb.group({
      BudgetStartDate: [
        "",
        [Validators.required, ValidateDateDirective.validateDate]
      ],
      BudgetEndDate: [
        "",
        [Validators.required, ValidateDateDirective.validateDate]
      ],
      BudgetAmount: [
        "",
        [Validators.required, ValidatecurrencyDirective.validateCurrency]
      ],
      BudgetType: ["", Validators.required]
    });
  }
  get BudgetStartDate() {
    return this.newBudgetForm.get("BudgetStartDate");
  }
  get BudgetEndDate() {
    return this.newBudgetForm.get("BudgetEndDate");
  }
  get BudgetType() {
    return this.newBudgetForm.get("BudgetType");
  }
  get BudgetAmount() {
    return this.newBudgetForm.get("BudgetAmount");
  }
}
