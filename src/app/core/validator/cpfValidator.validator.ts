import {AbstractControl, ValidationErrors} from "@angular/forms";
import {verificaCPF} from "../utils/cpf.utils";

export const cpfValidator = (formGroup: AbstractControl): ValidationErrors | null => {
    const cpf: string = formGroup.value;

    if(cpf)
      return !verificaCPF(cpf) ? {mensagemErro: 'CPF inválido'} : null;

    return null
};