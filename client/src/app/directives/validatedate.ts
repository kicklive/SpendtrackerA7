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
import { DATE_REGEX, stringsToDate } from "../utils/formsutil.factory";

@Directive({
  selector: "[app-validateDate][formControlName]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateDateDirective),
      multi: true
    }
  ]
})
export class ValidateDateDirective implements Validator {
  _validator: ValidatorFn;
  static validateDate(control: FormControl): ValidationErrors | null {
    debugger;
    const dateStr = control.value;

    if (!DATE_REGEX.test(dateStr)) {
      return null;
    }
    // Length of months (will update for leap years)
    const monthLengthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // Object to return if date is invalid
    const invalidObj = { date: true };
    // Parse the date input to integers
    const dateArr = dateStr.split("/");
    const month = parseInt(dateArr[0], 10);
    const day = parseInt(dateArr[1], 10);
    const year = parseInt(dateArr[2], 10);
    // Today's date
    const now = new Date();
    // Validate year and month
    if (year < now.getFullYear() || year > 3000 || month === 0 || month > 12) {
      return { invaliddate: invalidObj };
    }
    // Adjust for leap years
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
      monthLengthArr[1] = 29;
    }
    // Validate day
    if (!(day > 0 && day <= monthLengthArr[month - 1])) {
      return { invaliddate: invalidObj };
    }
    // If date is properly formatted, check the date vs today to ensure future
    // This is done this way to account for new Date() shifting invalid
    // date strings. This way we know the string is a correct date first.
    const date = new Date(dateStr);
    if (date <= now) {
      return { invaliddate: invalidObj };
    }
    return null;

    // const isDateValid = DATE_REGEX.test(control.value);
    // if (isDateValid) {
    //   return { validdate: "-1" };
    // } else {
    //   return null;
    // }
  }

  public validate(control: FormControl): { [key: string]: any } {
    return ValidateDateDirective.validateDate(control);
  }
}
