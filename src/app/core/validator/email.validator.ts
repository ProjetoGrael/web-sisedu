import {AbstractControl, ValidationErrors, Validators} from "@angular/forms";

export const emailValidator = (formGroup: AbstractControl): ValidationErrors | null  => {
    return Validators.email(formGroup) ? {mensagemErro: 'O e-mail não é válido'} : null;
};