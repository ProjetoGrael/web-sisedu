import {AbstractControl, ValidationErrors} from "@angular/forms";

export const obrigatorioValidator = (formGroup: AbstractControl): ValidationErrors | null  => {
        return !formGroup?.value ? {mensagemErro: 'O campo é obrigatório'} : null;
};
