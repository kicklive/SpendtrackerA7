import { Component, OnInit, NgZone, ViewChild, OnDestroy } from "@angular/core";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import { take } from "rxjs/operators";
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
import {
  MatSnackBar,
  _MatAutocompleteMixinBase,
  MatDialog,
  MatDialogRef
} from "@angular/material";
import { Observable, Subscription, of, BehaviorSubject, Subject } from "rxjs";
import { ProductdataService } from "../services/productdata.service";
import { ProductdialogComponent } from "../productdialog/productdialog.component";
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit, OnDestroy {
  searchProduct: FormGroup;
  upcSearch$ = new Subject<string>();
  private product: Products = {
    _id: "",
    ItemDescription: "",
    UPC: "",
    Price: ""
  };
  private productFound?: boolean = false;
  private showMsg?: boolean = false;
  displayedColumns = ["UPC", "itemdescription", "itemprice"];
  private serviceSubscription: Subscription;
  public showProducts = false;
  public showProdForm = false;
  public isEdit = false;
  private mdRef: MatDialogRef<ProductdialogComponent>;

  constructor(
    private fb: FormBuilder,
    private srch: ItemsearchService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private md: MatDialog
  ) { debugger;
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
            this.product.Price = res.Price;
            this.product.UPC = res.UPC;
            this.productFound = true;
            this.showMsg = false;
          } else {
            this.productFound = false;
            this.showMsg = true;
          }
          this.showProducts = false;
          this.showProdForm = false;
        });
      }
    });
  }
  @ViewChild("autosize") autosize: CdkTextareaAutosize;
  @ViewChild("searchProduct") formValues;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  ngOnInit() {}

  createForm(fb: FormBuilder) {
    return fb.group(
      {
        upc: "",
        itemdescription: ["", Validators.required],
        price: ["", Validators.required],
        itemupc: ["", Validators.required]
      },
      { updateOn: "blur" }
    );
  }
  showAllProducts() {
    this.serviceSubscription = this.route.data.subscribe(ret => {
      debugger;
      this.product = ret.data;
      this.showProducts = true;
      this.productFound = false;
    });
  }
  unSubscribe() {
    debugger;
    this.serviceSubscription.unsubscribe();
  }
  ngOnDestroy() {
    return this.unSubscribe();
  }
  editProduct(productId: number) {
    this.srch.SearchForItemById(productId).subscribe(res => {
      debugger;
      // this.searchProduct.get("price").setValue(res.Price);
      // this.searchProduct.get("itemupc").setValue(res.UPC);
      // this.searchProduct.get("itemdescription").setValue(res.ItemDescription);
      this.openDialog(res, "Edit");
    });
  }
  goBack() {
    this.showProdForm = false;
    this.productFound = false;
    this.showProducts = true;
    // this.formValues.resetForm();
    this.showMsg = false;
  }
  saveProduct() {}
  deleteProd(prodId: string) {}
  addProduct() {
    this.openDialog(null, "Add");
  }

  openDialog(res: any, title: string) {
    this.searchProduct.controls["itemupc"].disable();
    this.showProdForm = true;
    this.productFound = false;
    this.showProducts = false;
    this.showMsg = false;
    this.mdRef = this.md.open(ProductdialogComponent, {
      hasBackdrop: true,
      width: "50%",
      height: "55%",
      data: {
        price: res !== null ? res.Price : "",
        itemupc: res !== null ? res.UPC : "",
        itemdescription: res !== null ? res.ItemDescription : "",
        title: title + " Product"
      },
      autoFocus: false
    });
  }
}
