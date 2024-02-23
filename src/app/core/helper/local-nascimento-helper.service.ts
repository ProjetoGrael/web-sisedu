import { LocalNascimento } from './model/local-nascimento.model';
import { Observable } from 'rxjs/internal/Observable';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocalNascimentoHelperService extends HelperService{

  private static readonly ENDPOINT_RAIZ_LOCAL_NASCIMENTO_HELPER = `${environment.api_sisedu_url}/helper/api/local-nascimento`;

  constructor(private http: HttpClient) {
    super();
  }
  
  getLocaisNascimento(): Observable<LocalNascimento[]> {
    return this.http.get<LocalNascimento[]>(LocalNascimentoHelperService.ENDPOINT_RAIZ_LOCAL_NASCIMENTO_HELPER).pipe(take(1));;
  }
}
