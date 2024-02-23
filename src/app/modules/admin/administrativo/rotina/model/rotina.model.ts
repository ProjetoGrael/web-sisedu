import { TipoRotina } from './tipo-rotina.model';
export interface Rotina{
    id: string;
    nome: string;
    tipoRotina: TipoRotina;
    ativo: boolean;
}