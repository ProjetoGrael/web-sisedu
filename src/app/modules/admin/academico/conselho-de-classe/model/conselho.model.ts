import {NotaConselho} from "./nota-conselho.enum";
import {SituacaoConselho} from "./situacao-conselho.enum";


export class Conselho {
    id: number;
    conselhoInicial: NotaConselho;
    conselhoParcial: NotaConselho;
    conselhoFinal: NotaConselho;
    situacao: SituacaoConselho;
    opiniaoConselho: string;
    proximaDisciplinaPrincipalCurso: number;
}