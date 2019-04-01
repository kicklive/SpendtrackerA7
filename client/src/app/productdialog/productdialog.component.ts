import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidateNumberDirective } from "../directives/validatenumber";
import { ValidatecurrencyDirective } from "../directives/validatecurrency.directive";
import { CurrencyPipe } from "@angular/common";
import { Subject } from "rxjs";
import { currencyFormat } from "../utils/formsutil.factory";
import { ConfirmationdialogComponent } from "../confirmationdialog/confirmationdialog.component";
import { filter } from "rxjs/operators";
import { ProductdataService } from "../services/productdata.service";
import { ItemsearchService } from "../services/itemsearch.service";

@Component({
  selector: "app-productdialog",
  templateUrl: "./productdialog.component.html",
  styleUrls: ["./productdialog.component.css"]
})
export class ProductdialogComponent implements OnInit {
  private productForm: FormGroup;
  private disabled = false;
  public dialogTitle = "";
  private convertCurrency$ = new Subject<string>();
  private upcSearch$ = new Subject<string>();
  private ConfirmDialogRef: MatDialogRef<ConfirmationdialogComponent>;
  private result: any;
  public prodId = "";
  private productExists=false;

  constructor(
    private mdRef: MatDialogRef<ProductdialogComponent>,
    private fb: FormBuilder,
    private md: MatDialog,
    private pd: ProductdataService,
    private srch: ItemsearchService,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    debugger;
    let firstChar: any;
    let ret = "";
    let itemPrice: string;
    if (this.data.productId !== "") {
      ret = this.data.price;
      this.dialogTitle = this.data.title;
      this.disabled = true;
      this.prodId = this.data.productId;

      // ret = this.data ? this.data.price : "";
      // this.dialogTitle = this.data ? this.data.title : "";
      // this.productForm = this.createForm(fb);
      // this.disabled = this.data ? true : false;
      // this.prodId = this.data ? this.data.productId : "";
    } else {
      this.disabled = false;
      this.upcSearch$.subscribe(result => {
        if (result.length === 12) {
          debugger;
          this.srch.SearchForItem(result).subscribe(res => {
            debugger;
            if (res !== null) {
              this.productExists=true;
              this.productForm
                .get("itemdescription")
                .setValue(res.ItemDescription);
              itemPrice = res.price;
              if (itemPrice.length > 0) {
                firstChar = ret.toString().substring(0, 1);
                if (firstChar !== "$" && !isNaN(firstChar)) {
                  this.productForm
                    .get("price")
                    .setValue(currencyFormat(ret, 0));
                }
              }
            }
          });
        }
      });
    }
    this.productForm = this.createForm(fb);
    debugger;
    if (ret.toString().length > 0) {
      firstChar = ret.toString().substring(0, 1);
      if (firstChar !== "$" && !isNaN(firstChar)) {
        //  debugger;
        this.productForm.patchValue({ price: currencyFormat(ret, 0) });
      }
    }
    this.convertCurrency$.subscribe(r => {
      if (r.toString().length > 0) {
        firstChar = r.toString().substring(0, 1);
        if (firstChar !== "$" && !isNaN(firstChar)) {
          debugger;
          this.productForm.patchValue({ price: currencyFormat(r, 1) });
        }
      }
    });
  }
  ngOnInit() {
    debugger;
  }

  createForm(fb: FormBuilder) {
    debugger;
    return fb.group(
      {
        itemupc: [
          { value: this.data.itemupc, disabled: this.disabled },
          [
            Validators.required,
            Validators.minLength(12),
            ValidateNumberDirective.validateNum
          ]
        ],
        price: [
          this.data.price,
          [Validators.required, ValidatecurrencyDirective.validateCurrency]
        ],
        itemdescription: [this.data.itemdescription, [Validators.required]]
      },
      { updateOn: "blur" }
    );
  }

  submit(form) {
    debugger;
    this.mdRef.close(`${form}`);
  }
  deleteProd(p: string) {
    this.openConfirmDialog("Are you sure you want to delete this product?", p);
  }

  openConfirmDialog(confirmMsg: string, prodId: string) {
    this.ConfirmDialogRef = this.md.open(ConfirmationdialogComponent, {
      hasBackdrop: false,
      width: "50%",
      height: "15%",
      data: { msg: confirmMsg },
      autoFocus: false
    });
    this.ConfirmDialogRef.afterClosed()
      .pipe(filter(ret => ret))
      .subscribe(ret => {
        debugger;
        this.result = ret;
        switch (ret) {
          case "1":
            this.deleteProduct(prodId);
            break;
          case "2":
            this.addProduct();
            break;
        }
      });
  }

  deleteProduct(id: string) {
    let isDeleted = false;
    debugger;
    this.pd.DeleteProdById(id).subscribe(ret => {
      if (ret.result === "success") {
        isDeleted = true;
      }
      this.mdRef.close(`${isDeleted}`);
    });
  }
  addProduct() {
    // if(productExists){
      
    // }
  }

  // convertToCurrency(ret: string): string {
  //   let firstChar: any;
  //   if (ret.toString().length > 0) {
  //     firstChar = ret.toString().substring(0, 1);
  //     if (firstChar !== "$" && !isNaN(firstChar)) {
  //       debugger;
  //       this.productForm.patchValue({ price: currencyFormat(ret, 0) });
  //     }
  //   }
  //   this.convertCurrency$.subscribe(r => {
  //     if (r.toString().length > 0) {
  //       firstChar = r.toString().substring(0, 1);
  //       if (firstChar !== "$" && !isNaN(firstChar)) {
  //         debugger;
  //         this.productForm.patchValue({ price: currencyFormat(r, 1) });
  //       }
  //     }
  //   });
  // }

  get itemupc() {
    const xx = this.productForm.get("itemupc");
    return xx;
  }
  get price() {
    return this.productForm.get("price");
  }
  get itemdescription() {
    return this.productForm.get("itemdescription");
  }
}
