import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { MensagemSucesso } from './../../../../core/helper/model/mensagem-sucesso.model';
import { Agendamento } from './model/agendamento.model';
import { Observable } from 'rxjs';
import { Rotina } from './model/rotina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Pagina } from 'app/shared/pagina.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RotinaService extends CrudGenericService<Rotina> {

  constructor(protected http: HttpClient) {
     super(http, 'rotina')
  }

  ativar(id: string){
    return this.http.get(`${this.ENDPOINT}/${id}/ativado`).pipe(take(1));
  }

  desativar(id: string){
    return this.http.get(`${this.ENDPOINT}/${id}/desativado`).pipe(take(1));
  }

  buscarAgendamentos(id: string): Observable<Agendamento[]>{
    return this.http.get<Agendamento[]>(`${this.ENDPOINT}/${id}/agendamento`).pipe(take(1));
  }

  agendar(id: string, agendamento: Agendamento): Observable<MensagemSucesso>{
    return this.http.post<MensagemSucesso>(`${this.ENDPOINT}/${id}/agendamento`, agendamento).pipe(take(1));
  }

  reagendar(idPeriodo: number, idTarefaSituacaoProjeto: number, agendamento: Agendamento): Observable<MensagemSucesso>{
    return this.http.post<MensagemSucesso>(`${this.ENDPOINT}/agendamento/periodo/${idPeriodo}/tarefa-situacao-projeto/${idTarefaSituacaoProjeto}`, agendamento).pipe(take(1));
  }

  ativarAgendamento(idAgendamento: number){
    return this.http.get(`${this.ENDPOINT}/agendamento/${idAgendamento}/ativado`).pipe(take(1));
  }

  desativarAgendamento(idAgendamento: number){
    return this.http.get(`${this.ENDPOINT}/agendamento/${idAgendamento}/desativado`).pipe(take(1));
  }
}
