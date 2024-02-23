import { Curso } from "./curso.model";
import { PlanoAula } from "../../disciplina/model/plano-aula";

export interface Pauta {
    id?: number;
    notasAula: string;
    observacao: string;
    diaAula: string;
    idCurso: number;
    idPlanoAula: number;
    presencas: PresencaRetorno[];
}

export interface PresencaRetorno {
    id: string;
    situacao: string;
    participacao: string;
    idEstudante: string;
}