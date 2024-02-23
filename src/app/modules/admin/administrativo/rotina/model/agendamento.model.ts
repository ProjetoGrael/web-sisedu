import { TarefaSituacaoProjeto } from './tarefaSituacaoProjeto.model';
import { Periodo } from './periodo.model';

export interface Agendamento{
    periodo: Periodo;
    tarefaSituacaoProjeto: TarefaSituacaoProjeto;
}