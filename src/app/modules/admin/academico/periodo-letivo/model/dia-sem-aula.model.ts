import { PeriodoLetivo } from "./periodo-letivo.model";

export interface DiaSemAula{
    id?: number;
    descricao: string;
    dia: Date;
    periodoLetivo?: PeriodoLetivo 
}