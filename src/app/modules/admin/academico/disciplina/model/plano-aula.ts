import { Curso } from "../../turma/model/curso.model";

export interface PlanoAula{
    id?: number;
    anotacoes?: string;
    observacoes?: string;
    dataDeAplicacao: Date;
    aplicado: boolean;
    ordenacao: number;
    curso: Curso;
}