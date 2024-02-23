import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pauta } from '../../model/pauta.model';
import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { DiasComAula } from '../../model/dias-com-aula.model';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Metrica } from '../../model/metrica.model';

@Injectable({
  providedIn: 'root'
})
export class PautaService extends CrudGenericService<Pauta> {

  constructor(http: HttpClient) {
    super(http, "pauta")
  }

  salvarPauta(payload): Observable<Pauta> {
    return this.http
               .post<Pauta>(`${this.ENDPOINT}`, payload)
               .pipe(take(1));
  }

  atualizarPauta(idPauta, payload): Observable<Pauta> {
    return this.http
               .put<Pauta>(`${this.ENDPOINT}/${idPauta}`, payload)
               .pipe(take(1));
  }

  buscarPautaPorId(idPauta): Observable<Pauta>{
    return this.http.get<Pauta>(`${this.ENDPOINT}/${idPauta}`).pipe(take(1))
  }

  buscarPautaPorIdCursoEDataPauta(idCurso, dataPauta): Observable<Pauta>{
    return this.http.get<Pauta>(`${this.ENDPOINT}/curso/${idCurso}?dataPauta=${dataPauta}`).pipe(take(1))
  }

  buscarMetricas(idCurso, idEstudante): Observable<Metrica>{
    return this.http.get<Metrica>(`${this.ENDPOINT}/curso/${idCurso}/estudante/${idEstudante}/metricas`).pipe(take(1))
  }

}
