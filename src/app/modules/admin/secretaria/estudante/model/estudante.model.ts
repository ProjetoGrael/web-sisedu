import { Filiacao } from './filiacao.model';
import {Endereco} from "./endereco.model";
import {Contato} from "./contato.model";

export interface Estudante {
    id?: string;
    matricula?: string;
    nome: string;
    sobrenome: string;
    cpf?: string;
    nomeSocial: string;
    sexo: string;
    dataNascimento: Date;
    naturalidade?: string;
    localNascimento?: string;
    nacionalidade?: string;
    corEtnia?: string;
    numeroRg?: string;
    dataEmissaoRg?: Date;
    orgaoExpedidorRg?: string;
    endereco: Endereco;
    filiacao?: Filiacao;
    contatos: Contato[];
}