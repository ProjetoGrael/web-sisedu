import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const valorMinimoValidator = (minimo: number): ValidatorFn => {
    return (formGroup: AbstractControl): ValidationErrors | null  => {
        const valor: number = formGroup.value;

        return valor < minimo ? {mensagemErro: `Não pode ser menor que o valor mínimo: ${minimo}`} : null;
    }
}