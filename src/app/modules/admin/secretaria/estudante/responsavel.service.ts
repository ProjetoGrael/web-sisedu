import { TipoResponsavel } from './model/tipo-responsavel.model';
import { Observable } from 'rxjs';
import { Responsavel } from './model/responsavel.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {

  private static readonly ENDPOINT_RAIZ_ESTUDANTE = `${environment.api_sisedu_url}/estudante`

  private static readonly ENDPOINT_RAIZ_TIPO_RESPONSAVEL = `${environment.api_sisedu_url}/tipo-responsavel`

  constructor(private http: HttpClient) { }

 cadastrarResponsavel(id: string, responsavel: Responsavel): Observable<Responsavel>{
    return this.http.post<Responsavel>(`${ResponsavelService.ENDPOINT_RAIZ_ESTUDANTE}/${id}/responsavel`, responsavel).pipe(take(1));;
  }

 atualizarResponsavel(id: string, responsavel: Responsavel): Observable<Responsavel>{
    return this.http.put<Responsavel>(`${ResponsavelService.ENDPOINT_RAIZ_ESTUDANTE}/${id}/responsavel`, responsavel).pipe(take(1));;
 }

 buscarResponsavelPorUUIDEstudante(id: string): Observable<Responsavel>{
  return this.http.get<Responsavel>(`${ResponsavelService.ENDPOINT_RAIZ_ESTUDANTE}/${id}/responsavel`).pipe(take(1));;
} 

 buscarResponsavelPorCpf(cpf: string): Observable<Responsavel>{
  return this.http.get<Responsavel>(`${ResponsavelService.ENDPOINT_RAIZ_ESTUDANTE}/responsavel/${cpf}`).pipe(take(1));;
}

 deletarResponsavel(id: string): Observable<any>{
  return this.http.delete(`${ResponsavelService.ENDPOINT_RAIZ_ESTUDANTE}/${id}/responsavel`).pipe(take(1));;
}

 buscarTiposReponsavel(): Observable<TipoResponsavel[]> {
  return this.http.get<TipoResponsavel[]>(ResponsavelService.ENDPOINT_RAIZ_TIPO_RESPONSAVEL).pipe(take(1));;
}

}
