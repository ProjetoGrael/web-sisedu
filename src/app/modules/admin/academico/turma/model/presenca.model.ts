import { Estudante } from "app/modules/admin/secretaria/estudante/model/estudante.model";
import { Pauta } from "./pauta.model";

export interface Presenca {
    id?: number;
    situacao: string;
    participacao: string;
    estudante: Estudante;
    pauta: Pauta;

}