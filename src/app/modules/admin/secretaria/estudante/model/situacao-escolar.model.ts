import {Escola} from "./escola.model";

export interface SituacaoEscolar {
    escolaridade: string;
    turno: string;
    periodo: bigint;
    situacao: string;
    bolsista: boolean;
    estado_escolaridade: string;
    nivel: bigint;
    escola: Escola;
}