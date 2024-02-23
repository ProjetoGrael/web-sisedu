import { Disciplina } from './../../disciplina/model/disciplina.model';
import { Instrutor } from './instrutor.model';
export interface InstrutorDisciplina{
    id?: number;
    instrutor: Instrutor;
    disciplina: Disciplina;
    ativo?: boolean;
}