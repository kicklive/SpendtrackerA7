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
  selector: "[app-validateNum][formControlName]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateNumberDirective),
      multi: true
    }
  ]
})
export class ValidateNumberDirective implements Validator {
  _validator: ValidatorFn;
  static validateNum(control: FormControl): ValidationErrors | null {
    debugger;
    const isANumber = isNaN(control.value);
    if (isANumber) {
      return { upcnum: "-1" };
    } else {
      return null;
    }
  }

  public validate(control: FormControl): { [key: string]: any } {
    return ValidateNumberDirective.validateNum(control);
  }
}
