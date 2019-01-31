import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[confirmEqualsValidator]',
    providers: [{
        // Add validator to Angular list of Validators.
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualsValidator,
        multi: true
    }]
})

export class ConfirmEqualsValidator implements Validator {

    @Input() confirmEqualsValidator: string;

    // accepts a control object passed in.
    validate(control: AbstractControl): { [key: string]: any } | null {

        // control.parent references the Form element.
        const controlToCompare = control.parent.get(this.confirmEqualsValidator);

        // if they are not equal return that it failed, else return null means is passed.
        if (controlToCompare && controlToCompare.value !== control.value) {
            return { 'notEqual': true };
        } else {
            return null;
        }
    }
}