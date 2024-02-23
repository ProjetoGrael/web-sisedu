import {Estudante} from "../../../secretaria/estudante/model/estudante.model";
import {Turma} from "./turma.model";
import {Conselho} from "../../conselho-de-classe/model/conselho.model";
import {SituacaoInscricao} from "./situacao-inscricao.enum";
export interface Inscricao{
    id: number;
    dataInicio: number;
    dataFim: number;
    situacao: SituacaoInscricao;
    comentarioAluno: string;
    ativo: boolean;
    dataRenovacao: Date;
    statusEstudante: string;
    dataModificacaoSituacao: Date;
    estudante: Estudante;
    turma: Turma;
    conselhoDeClasse: Conselho;
}