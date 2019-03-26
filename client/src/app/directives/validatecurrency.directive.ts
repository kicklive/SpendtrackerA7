import { Directive, Input, forwardRef } from "@angular/core";
import {
  Validator,
  AbstractControl,
  NG_VALIDATORS,
  Validators,
  ValidatorFn,
  ValidationErrors,
  FormControl
} from "@angular/forms";

@Directive({
  selector: "[appValidatecurrency]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidatecurrencyDirective),
      multi: true
    }
  ]
})
export class ValidatecurrencyDirective implements Validator {
  _validator: ValidatorFn;

  static validateCurrency(control: FormControl): ValidationErrors | null {
    debugger;
    let val: string;
    val = control.value;
    let isANumber: any;
    const dollarSign = val.toString().substring(0, 1);
    if (dollarSign === "$") {
      const numVal = val
        .toString()
        .substring(1, val.length)
        .replace(",", "");
      isANumber = Number(numVal);
    } else {
      isANumber = val;
    }
    if (isNaN(isANumber)) {
      return { upcnum: "-1" };
    } else {
      return null;
    }
    // const isANumber = Number(control.value);
    // if (isANumber === NaN) {
    //const isANumber = Number(control.value);
    // if (Number.isNaN(isANumber)) {
    //   return { upcnum: "-1" };
    // } else {
    //   return null;
    // }
  }

  public validate(control: FormControl): { [key: string]: any } {
    return ValidatecurrencyDirective.validateCurrency(control);
  }
}
