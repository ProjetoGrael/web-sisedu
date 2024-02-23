import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnderecoBrasilApi} from "./endereco-brasil-api.model";

@Injectable({
  providedIn: 'root'
})
export class EnderecoBrasilApiService {

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string): Observable<EnderecoBrasilApi>{
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep !== '') {
      // Expressão regular para validar o CEP.
      const validacep = /^[0-9]{8}$/;

      // Valida o formato do CEP.
      if (validacep.test(cep)) {
        return this.http.get<EnderecoBrasilApi>(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      }
    }

    return new Observable<EnderecoBrasilApi>();
  }
}
