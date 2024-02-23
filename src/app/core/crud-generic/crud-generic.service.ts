import { SituacaoProjeto } from "./../../modules/admin/secretaria/estudante/model/situacao-projeto.model";
import { Estudante } from "./../../modules/admin/secretaria/estudante/model/estudante.model";
import { Pagina } from "./../../shared/pagina.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CrudGenericService<E> {
  protected static readonly API_URL = `${environment.api_sisedu_url}`;
  protected readonly ENDPOINT;

  constructor(protected http: HttpClient, private recurso: string) { 
      this.ENDPOINT = `${CrudGenericService.API_URL}/${this.recurso}`
  }

  salvar<S>(payload: E): Observable<S> {
    return this.http
               .post<S>(`${this.ENDPOINT}`, payload)
               .pipe(take(1));
  }

  atualizar<S>(id, payload: E): Observable<S> {
    return this.http
               .put<S>(`${this.ENDPOINT}/${id}`, payload)
               .pipe(take(1));
  }

  deletar(id): Observable<any> {
    return this.http
               .delete(`${this.ENDPOINT}/${id}`)
               .pipe(take(1));
  }

  buscarPorId<S>(id): Observable<S> {
    return this.http
               .get<S>(`${this.ENDPOINT}/${id}`)
               .pipe(take(1));
  }

  listar<S>(): Observable<S[]> {
    return this.http
               .get<S[]>(`$${this.ENDPOINT}`)
               .pipe(take(1));
  }


  listarComPaginacao<S>(pagina?: number, tamanho?: number): Observable<Pagina<S>> {
    let params = new HttpParams();
    params.append("pagina", pagina);
    params.append("tamanho", tamanho);

    return this.http
               .get<Pagina<S>>(`${this.ENDPOINT}`, { params })
               .pipe(take(1));
  }
}
