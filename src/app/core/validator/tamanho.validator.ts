import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export const tamanhoMinimoValidator = (tamanho: number): ValidatorFn => {
    return (formGroup: AbstractControl): ValidationErrors | null  => {
        const valor: string = formGroup.value;

        return valor?.length < tamanho ? {mensagemErro: `Não pode ter menos que ${tamanho} letras`} : null;
    }
}

export const tamanhoMaximoValidator = (tamanho: number): ValidatorFn => {
    return (formGroup: AbstractControl): ValidationErrors | null  => {
        const valor: string = formGroup.value;

        return valor?.length > tamanho ? {mensagemErro: `Não pode ter mais que ${tamanho} letras`} : null;
    }
}