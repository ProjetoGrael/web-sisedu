import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { TipoRotina } from './model/tipo-rotina.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TipoRotinaService extends CrudGenericService<TipoRotina> {

  constructor(protected http: HttpClient) {
    super(http,  'tipo-rotina')
  }

}
