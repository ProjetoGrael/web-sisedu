import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bairro } from './model/bairro.model';
import { Cidade } from './model/cidade.model';
import { Estado } from './model/estado.model';
import { SubBairro } from './model/sub-bairro.model';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EnderecoHelperService extends HelperService {

  private static readonly ENDPOINT_RAIZ_ENDERECO_HELPER = `${environment.api_sisedu_url}/endereco`;
  private static readonly ENDPOINT_RAIZ_ESTADO = `${EnderecoHelperService.ENDPOINT_RAIZ_ENDERECO_HELPER}/estado`;
  private static readonly ENDPOINT_RAIZ_CIDADE = `${EnderecoHelperService.ENDPOINT_RAIZ_ENDERECO_HELPER}/cidade`;
  private static readonly ENDPOINT_RAIZ_BAIRRO = `${EnderecoHelperService.ENDPOINT_RAIZ_ENDERECO_HELPER}/bairro`;
  
  constructor(private http: HttpClient) {
    super();
  }

  buscarTodosEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(EnderecoHelperService.ENDPOINT_RAIZ_ESTADO).pipe(take(1));;
  }

  buscarCidadesDoEstado(idEstado: number): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${EnderecoHelperService.ENDPOINT_RAIZ_ESTADO}/${idEstado}/cidade`).pipe(take(1));
  }

  buscarBairrosDaCidade(idCidade: number): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${EnderecoHelperService.ENDPOINT_RAIZ_CIDADE}/${idCidade}/bairro`).pipe(take(1));
  }

  buscarSubBairrosDoBairro(idBairro: number): Observable<SubBairro[]> {
    return this.http.get<SubBairro[]>(`${EnderecoHelperService.ENDPOINT_RAIZ_BAIRRO}/${idBairro}/sub-bairro`).pipe(take(1));
  }
}
