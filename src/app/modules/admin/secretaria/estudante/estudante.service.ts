import { SituacaoFamiliar } from './model/situacao-familiar.model';

import { delay, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {ChecklistDocumentacao} from "./model/checklist.model";
import {EstudanteParcial} from "./model/estudanteParcial.model";
import {SituacaoEscolar} from "./model/situacao-escolar.model";
import { SituacaoProjeto } from './model/situacao-projeto.model';
import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { Estudante } from './model/estudante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService extends CrudGenericService<Estudante> {

  constructor(protected http: HttpClient) {
    super(http, 'estudante');
  }

  buscarEstudanteParcialPorId(id: string): Observable<EstudanteParcial>{
    return this.http.get<EstudanteParcial>(`${this.ENDPOINT}/${id}/parcial`)
                    .pipe(take(1))
  }

  buscarEstudantePorId(id: string): Observable<Estudante>{
    return this.http.get<Estudante>(`${this.ENDPOINT}/${id}`)
                    .pipe(take(1))
  }

  buscarChecklistDocumentacaoPorIdEstudante(id: string): Observable<ChecklistDocumentacao>{
    return  this.http.get<ChecklistDocumentacao>(`${this.ENDPOINT}/${id}/checklist-documentacao`)
                     .pipe(take(1))
  }

  atualizarChecklist(id: string, checklist: ChecklistDocumentacao): Observable<ChecklistDocumentacao>{
    return this.http.put<ChecklistDocumentacao>(`${this.ENDPOINT}/${id}/checklist-documentacao`, checklist)
                    .pipe(take(1))
  }

  salvarChecklist(id: string, checklist: ChecklistDocumentacao): Observable<ChecklistDocumentacao>{
    return this.http.post<ChecklistDocumentacao>(`${this.ENDPOINT}/${id}/checklist-documentacao`, checklist)
                    .pipe(take(1))
  }

  buscarSituacaoEscolarPorIdEstudante(id: string): Observable<SituacaoEscolar>{
    return  this.http.get<SituacaoEscolar>(`${this.ENDPOINT}/${id}/situacao-escolar`)
                     .pipe(take(1))
  }

  atualizarSituacaoEscolar(id: string, situacaoEscolar: SituacaoEscolar): Observable<SituacaoEscolar>{
    return this.http.put<SituacaoEscolar>(`${this.ENDPOINT}/${id}/situacao-escolar`, situacaoEscolar)
                    .pipe(take(1))
  }

  salvarSituacaoEscolar(id: string, situacaoEscolar: SituacaoEscolar): Observable<SituacaoEscolar>{
    return this.http.post<SituacaoEscolar>(`${this.ENDPOINT}/${id}/situacao-escolar`, situacaoEscolar)
                    .pipe(take(1))
  }
  
  buscarSituacoesProjeto(id: string): Observable<SituacaoProjeto[]>{
    return this.http.get<SituacaoProjeto[]>(`${this.ENDPOINT}/${id}/situacao-projeto`)
                    .pipe(take(1))
                    
  }

  inluirSituacaoProjeto(id: string, situacaoProjeto: SituacaoProjeto) {
    return this.http.post<SituacaoProjeto>(`${this.ENDPOINT}/${id}/situacao-projeto`, situacaoProjeto)
               .pipe(take(1))
  }

  inlcuirSituacaoFamiliar(id: string, situacaoFamiliar: SituacaoFamiliar){
    return this.http.post<SituacaoProjeto>(`${this.ENDPOINT}/${id}/situacao-familiar`, situacaoFamiliar)
               .pipe(take(1))
  }

  editarSituacaoFamiliar(id: string, situacaoFamiliar: SituacaoFamiliar){
    return this.http.put<SituacaoProjeto>(`${this.ENDPOINT}/${id}/situacao-familiar`, situacaoFamiliar)
               .pipe(take(1))
  }

  buscarSituacaoFamiliarPorIdEstudante(id: string): Observable<SituacaoFamiliar>{
    return  this.http.get<SituacaoFamiliar>(`${this.ENDPOINT}/${id}/situacao-familiar`)
                     .pipe(take(1))
  }

}
