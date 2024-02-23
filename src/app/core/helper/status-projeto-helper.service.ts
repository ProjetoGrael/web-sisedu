import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { StatusProjeto } from './model/status-projeto.model';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatusProjetoHelperService extends HelperService{

  private static readonly ENDPOINT_RAIZ_STATUS_PROJETO_HELPER = `${environment.api_sisedu_url}/helper/api/status-projeto`;

  constructor(private http: HttpClient) {
    super();
  }
  
  getStatusProjeto(): Observable<StatusProjeto[]> {
    return this.http.get<StatusProjeto[]>(StatusProjetoHelperService.ENDPOINT_RAIZ_STATUS_PROJETO_HELPER).pipe(take(1));;
  }
}
