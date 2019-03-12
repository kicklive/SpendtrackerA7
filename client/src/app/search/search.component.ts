import { Component, OnInit } from "@angular/core";
import { ItemsearchService } from "../services/itemsearch.service";
import { Subject } from "rxjs";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Products } from "../models/productdata";
import { ProductComponent } from "../product/product.component";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  searchProduct: FormGroup;
  upcSearch$ = new Subject<string>();
  private product: Products = {
    ItemDescription: "",
    UPC: "",
    ItemPrice: ""
  };
  private productFound?: boolean = false;
  private showMsg?: boolean = false;

  constructor(private fb: FormBuilder, private srch: ItemsearchService) {
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
}
