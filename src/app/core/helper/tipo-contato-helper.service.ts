import { take } from 'rxjs/operators';
import { TipoContato } from './model/tipo-contato.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TipoContatoHelperService extends HelperService{

  private static readonly ENDPOINT_RAIZ_TIPO_CONTATO_HELPER = `${environment.api_sisedu_url}/helper/api/tipo-contato`;

  constructor(private http: HttpClient) {
    super();
  }

  getTiposContato(): Observable<TipoContato[]> {
    return this.http.get<TipoContato[]>(TipoContatoHelperService.ENDPOINT_RAIZ_TIPO_CONTATO_HELPER).pipe(take(1));;
  }
}
