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

@Component({
  selector: "app-productdialog",
  templateUrl: "./productdialog.component.html",
  styleUrls: ["./productdialog.component.css"]
})
export class ProductdialogComponent implements OnInit {
  private productForm: FormGroup;
  private disabled = false;
  public dialogTitle: string;
  private convertCurrency$ = new Subject<string>();
  private ConfirmDialogRef: MatDialogRef<ConfirmationdialogComponent>;
  private result: any;

  constructor(
    private mdRef: MatDialogRef<ProductdialogComponent>,
    private fb: FormBuilder,
    private md: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
    // debugger;
    let firstChar: any;
    let ret: string;
    ret = this.data ? this.data.price : "";
    this.dialogTitle = this.data ? this.data.title : "";
    this.productForm = this.createForm(fb);
    this.disabled = this.data ? true : false;

    debugger;
    if (ret.toString().length > 0) {
      firstChar = ret.toString().substring(0, 1);
      if (firstChar !== "$" && !isNaN(firstChar)) {
        debugger;

        // const currencyNum = new CurrencyPipe("en-US").transform(
        //   ret,
        //   "USD",
        //   "symbol",
        //   "1.2-2"
        // );
        // this.productForm.patchValue({ price: currencyNum });
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

  // createForm(fb: FormBuilder) {
  //   debugger;
  //   return fb.group({
  //     itemupc: [
  //       this.data ? this.data.itemupc : "",
  //       [
  // Validators.required,
  // Validators.minLength(12),
  // ValidateNumberDirective.validateNum
  //       ]
  //     ],
  //     price: [
  //       this.data ? this.data.price : "",
  //       [Validators.required, ValidatecurrencyDirective.validateCurrency]
  //     ],
  //     itemdescription: [
  //       this.data ? this.data.itemdescription : "",
  //       Validators.required
  //     ]
  //   });
  // }

  submit(form) {
    debugger;
    this.mdRef.close(`${form}`);
  }
  deleteProd(prodId: string) {
    //this.mdRef.close(`${prodId}`);
    this.openConfirmDialog("Are you sure you want to delete this product?");
  }

  openConfirmDialog(confirmMsg:string) {
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
          case 1:
            this.deleteProduct();
            break;
          case 2:
            this.addProduct();
            break;
        }
      });
  }

  deleteProduct() {}
  addProduct() {}

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
