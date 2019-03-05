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
    const val: string = control.value;
    const dollarSign = val.substring(0, 1);
    if (dollarSign === "$") {
      const numVal = val.substring(1, val.length);

      const isANumber = Number(numVal);
      if (isANumber === NaN) {
        return { upcnum: "-1" };
      } else {
        return null;
      }
    } else {
      return { upcnum: "-1" };
    }
  }

  public validate(control: FormControl): { [key: string]: any } {
    return ValidatecurrencyDirective.validateCurrency(control);
  }
}
