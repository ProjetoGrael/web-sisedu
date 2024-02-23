export interface DataHora{
    segundos: number[];
    minutos: number[];
    horas: number[];
    diasMes: number[];
    meses: Mes[];
    diasSemana: DiaSemana[];
}

export interface Mes{
    descricao: string;
}

export interface DiaSemana {
    descricao: string;
}