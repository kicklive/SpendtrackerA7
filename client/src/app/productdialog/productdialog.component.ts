import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidateNumberDirective } from "../directives/validatenumber";
import { ValidatecurrencyDirective } from "../directives/validatecurrency.directive";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: "app-productdialog",
  templateUrl: "./productdialog.component.html",
  styleUrls: ["./productdialog.component.css"]
})
export class ProductdialogComponent implements OnInit {
  private productForm: FormGroup;
  constructor(
    private md: MatDialogRef<ProductdialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data
  ) {
   // debugger;
    let firstChar: any;
    let ret:string;
   ret = this.data ? this.data.price : "";
    this.productForm = this.createForm(fb);
    debugger;
    if (ret.toString().length > 0) {
      firstChar = ret.toString().substring(0, 1);
      if (firstChar !== "$" && !isNaN(firstChar)) {
        debugger;
        const currencyNum = new CurrencyPipe("en-US").transform(
          ret,
          "USD",
          "symbol",
          "1.2-2"
        );
        this.productForm.patchValue({ price: currencyNum });
      }
    }
  }

  ngOnInit() {}

  createForm(fb: FormBuilder) {
    debugger;
    return fb.group({
      itemupc: [
        this.data ? this.data.itemupc : "",
        [
          Validators.required,
          Validators.minLength(12),
          ValidateNumberDirective.validateNum
        ]
      ],
      price: [
        this.data ? this.data.price : "",
        [Validators.required, ValidatecurrencyDirective.validateCurrency]
      ],
      itemdescription: [
        this.data ? this.data.itemdescription : "",
        [Validators.required]
      ]
    });
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
    this.md.close(`${form}`);
  }
  deleteProduct(prodId: string) {
    this.md.close(`${prodId}`);
  }

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
