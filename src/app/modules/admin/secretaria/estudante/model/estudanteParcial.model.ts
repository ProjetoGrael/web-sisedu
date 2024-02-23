export interface EstudanteParcial {
    matricula: string;
    nome: string;
    sexo: string;
    turma: string;
    idade: number;
    temObservacao: boolean;
    temTurmasPassadas: boolean;
    Observacoes?: string[];
}