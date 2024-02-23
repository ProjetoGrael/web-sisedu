import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Endereco} from "./model/endereco.model";
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoViaCepService {

  constructor(private http: HttpClient) { }

  buscarEndereco(cep: string): Observable<Endereco>{

      // Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, '');

      // Verifica se campo cep possui valor informado.
      if (cep !== '') {
          // Expressão regular para validar o CEP.
          const validacep = /^[0-9]{8}$/;

          // Valida o formato do CEP.
          if (validacep.test(cep)) {
              return this.http.get<Endereco>(`/viacep/${cep}/json`).pipe(take(1));;
          }
      }

      return new Observable<Endereco>();
  }

}
