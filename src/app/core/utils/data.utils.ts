import moment from "moment";

export function idade(dataNascimento) {
    return moment().diff(dataNascimento, 'years');
}

export function isMaiorIdade(dataNascimento): boolean {
    return idade(dataNascimento) >= 18;
}