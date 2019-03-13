import { Component, OnInit, OnDestroy } from "@angular/core";
import { ItemsearchService } from "../services/itemsearch.service";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Products } from "../models/productdata";

import { SharedService } from "../services/shared.service";
import { bind } from "@angular/core/src/render3";
import { ActivatedRoute, Router } from "@angular/router";
import { DataresolveService } from "../services/dataresolve.service";
import { PersistanceService } from "../services/persistance.service";
import { PersistantValues } from "../models/helper";
import { MatSnackBar, _MatAutocompleteMixinBase } from "@angular/material";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";
import { ProductdataService } from "../services/productdata.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit, OnDestroy {
  searchProduct: FormGroup;
  upcSearch$ = new Subject<string>();
  private product: Products = {
    ItemDescription: "",
    UPC: "",
    ItemPrice: ""
  };
  private productFound?: boolean = false;
  private showMsg?: boolean = false;
  displayedColumns = ["itemprice", "itemdescription", "store"];
  private serviceSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private srch: ItemsearchService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.searchProduct = this.createForm(fb);
    this.upcSearch$.subscribe(ret => {
      this.showMsg = false;
      this.productFound = false;
      if (ret.length === 12) {
        debugger;
        this.srch.SearchForItem(ret).subscribe(res => {
          debugger;
          if (res !== null) {
            this.product.ItemDescription = res.ItemDescription;
            this.product.ItemPrice = res.Price;
            this.product.UPC = res.UPC;
            this.productFound = true;
            this.showMsg = false;
          } else {
            this.productFound = false;
            this.showMsg = true;
          }
        });
      }
    });
  }

  ngOnInit() {}

  createForm(fb: FormBuilder) {
    return fb.group({
      upc: ["", Validators.required]
    });
  }
  showAllProducts() {
    this.serviceSubscription = this.route.data.subscribe(ret => {
      this.product = ret.data;
    });
  }
  unSubscribe() {
    debugger;
    this.serviceSubscription.unsubscribe();
  }
  ngOnDestroy() {
    return this.unSubscribe();
  }
}
