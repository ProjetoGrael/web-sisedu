import {Observable} from "rxjs";
import {Escola} from "./model/escola.model";
import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import { take } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EscolaService {

    private static readonly ENDPOINT_RAIZ = `${environment.api_sisedu_url}`

    constructor(private http: HttpClient) {}

    buscarEscolas(): Observable<Escola[]> {
        return this.http.get<Escola[]>(`${EscolaService.ENDPOINT_RAIZ}/escola`).pipe(take(1));
    }
}