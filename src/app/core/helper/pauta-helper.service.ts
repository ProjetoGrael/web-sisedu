import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PautaHelperService {

  private static readonly ENDPOINT_RAIZ_PAUTA_HELPER = `${environment.api_sisedu_url}/helper/pauta`;

  constructor(private http: HttpClient) {
    
  }

  buscarSituacoesPresencao(): Observable<string[]> {
    return this.http.get<string[]>(`${PautaHelperService.ENDPOINT_RAIZ_PAUTA_HELPER}/situacao-presenca`).pipe(take(1));
  }

  buscarParticipacoes(): Observable<string[]> {
    return this.http.get<string[]>(`${PautaHelperService.ENDPOINT_RAIZ_PAUTA_HELPER}/participacao`).pipe(take(1));
  }
}
