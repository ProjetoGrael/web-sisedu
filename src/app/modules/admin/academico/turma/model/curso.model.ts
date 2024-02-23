import { InstrutorDisciplina } from "./../../instrutores/model/instrutor-disciplina.model";
import { Turma } from "./turma.model";
export interface Curso {
  id?: number;
  nome?: string;
  horarioInicio: Date;
  horarioTermino: Date;
  segundaFeira: boolean;
  tercaFeira: boolean;
  quartaFeira: boolean;
  quintaFeira: boolean;
  sextaFeira: boolean;
  disciplinaPrincipal: Boolean;
  instrutorDisciplina: InstrutorDisciplina;
  turma: Turma;
}
