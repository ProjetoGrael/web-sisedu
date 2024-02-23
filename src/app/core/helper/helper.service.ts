import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  protected static readonly ENDPOINT_RAIZ_HELPER = `${environment.api_sisedu_url}`
  
  constructor(){}
}
