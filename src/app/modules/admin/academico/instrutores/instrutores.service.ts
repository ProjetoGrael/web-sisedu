import { InstrutorDisciplina } from './model/instrutor-disciplina.model';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { CrudGenericService } from './../../../../core/crud-generic/crud-generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Instrutor } from './model/instrutor.model';

@Injectable({
  providedIn: 'root'
})
export class InstrutoresService extends CrudGenericService<Instrutor> {

  constructor(protected http: HttpClient) {
    super(http, 'instrutor');
  }

  desativar(id: number): Observable<Instrutor>{
    return this.http
               .get<Instrutor>(`${this.ENDPOINT}/${id}/desativado`)
               .pipe(take(1));
  }

  ativar(id: number): Observable<Instrutor>{
    return this.http
               .get<Instrutor>(`${this.ENDPOINT}/${id}/ativado`)
               .pipe(take(1));
  }

  associarDisciplina(idInstrutor: number, idDisciplina): Observable<any>{
    return this.http.get<any>(`${this.ENDPOINT}/${idInstrutor}/disciplina/${idDisciplina}`)
                    .pipe(take(1))
  }

  desassociarDisciplina(idAssociacao: number){
    return this.http.get(`${this.ENDPOINT}/associacao/${idAssociacao}/desativado`).pipe(take(1))
  }

  ativarAssiciaoDisciplina(idAssociacao: number){
    return this.http.get(`${this.ENDPOINT}/associacao/${idAssociacao}/ativado`).pipe(take(1))
  }

  buscarTodasDisciplinasAssociadas(idInstrutor: number): Observable<InstrutorDisciplina[]>{
    return this.http.get<InstrutorDisciplina[]>(`${this.ENDPOINT}/${idInstrutor}/associacao-disciplina`)
                    .pipe(take(1))
  }

}
