import { PeriodoLetivo } from './../../../academico/periodo-letivo/model/periodo-letivo.model';

export interface Turma {
    id?: number;
    nomeFantasia: string;
    comentario: string;
    periodoLetivo?: PeriodoLetivo;
}