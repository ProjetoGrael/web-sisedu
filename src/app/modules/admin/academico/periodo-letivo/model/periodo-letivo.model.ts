import { StatusPeriodoLetivo } from "./status-periodo-letivo.model";

export interface PeriodoLetivo {
  id?: number;
  nome: string;
  dataInicio: Date;
  dataFim: Date;
  capacidade: number;
  statusPeriodoLetivo: StatusPeriodoLetivo;
}