import {CrudGenericService} from "../../../../core/crud-generic/crud-generic.service";
import {HttpClient} from "@angular/common/http";
import {Nivel} from "./model/nivel.model";
import {Observable} from "rxjs/internal/Observable";
import {take} from "rxjs/operators";
import {environment} from "../../../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class NivelService extends CrudGenericService<Nivel> {

    private static readonly ENDPOINT_RAIZ_NIVEL = `${environment.api_sisedu_url}/disciplina/nivel`;

    constructor(protected http: HttpClient) {
        super(http, 'disciplina/nivel');
    }

    buscarTodosNiveis(): Observable<Nivel[]> {
        return this.http.get<Nivel[]>(NivelService.ENDPOINT_RAIZ_NIVEL).pipe(take(1));
    }

}