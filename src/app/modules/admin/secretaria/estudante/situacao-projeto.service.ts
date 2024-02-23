import { SituacaoProjeto } from './model/situacao-projeto.model';
import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SituacaoProjetoService extends CrudGenericService<SituacaoProjeto> {

  constructor(protected http: HttpClient) {
    super(http, 'situacao-projeto');
  }
}
