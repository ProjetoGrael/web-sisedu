import { DataHora } from './model/data-hora.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './helper.service';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataHoraHelperService extends HelperService {

  private static readonly ENDPOINT_RAIZ_DATA_HORA = `${environment.api_sisedu_url}/helper/api/data-hora`;

  constructor(private http: HttpClient) { 
    super()
  }

  buscarDataHora(): Observable<DataHora>{
     return this.http.get<DataHora>(DataHoraHelperService.ENDPOINT_RAIZ_DATA_HORA).pipe(take(1));
  }
}
