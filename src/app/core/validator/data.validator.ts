import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {idade} from "../utils/data.utils";

export const dataMaiorOuIgualAtualValidator = (formGroup: AbstractControl): ValidationErrors | null => {
    const data: string = formGroup.value;

    if(data)
       return moment(data).isAfter(moment(new Date())) ? {mensagemErro: 'A data escolhida é maior que a data atual'} : null;

    return null
};

export const dataPadraoValidator = (formGroup: AbstractControl): ValidationErrors | null => {
    const data: Date = formGroup.value;

    if(data) {
        const dataFormatada = moment(data).format("DD/MM/YYYY")

        return !dataFormatada.match("^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}$") ?
            {mensagemErro: 'A data está no padrão errado, o corredo é: dia/mes/ano'} :
            null;
    }

    return null
};

export const anoMinimoValidator = (ano: number): ValidatorFn => {
    return (formGroup: AbstractControl): ValidationErrors | null  => {
        const valor: Date = formGroup.value;

        return idade(valor) < ano ? {mensagemErro: `Não pode ser menor que ${ano} anos`} : null;
    }
}