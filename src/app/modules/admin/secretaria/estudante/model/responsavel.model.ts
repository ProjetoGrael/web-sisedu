import {TipoResponsavel} from "./tipo-responsavel.model";

export interface Responsavel {
    id?: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    email?: string,
    telefone?: string,
    celular?: string,
    rg?: string,
    tipoResponsavel: TipoResponsavel
}