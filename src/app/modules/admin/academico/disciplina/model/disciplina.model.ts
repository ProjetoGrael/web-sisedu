import { Nivel } from "./nivel.model";
import { Programa } from "./programa.model";

export interface Disciplina {
    id: number;
    nome: string;
    tipo: string;
    cargaHoraria: number;
    ativo: boolean;
    nivel: Nivel;
    programa: Programa;
}