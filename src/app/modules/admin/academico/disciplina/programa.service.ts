import {CrudGenericService} from "../../../../core/crud-generic/crud-generic.service";
import {Programa} from "./model/programa.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs/internal/Observable";
import {take} from "rxjs/operators";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ProgramaService extends CrudGenericService<Programa> {

    private static readonly ENDPOINT_RAIZ_PROGRAMA = `${environment.api_sisedu_url}/disciplina/programa`;

    constructor(protected http: HttpClient) {
        super(http, 'disciplina/programa');
    }

    buscarTodosProgramas(): Observable<Programa[]> {
        return this.http.get<Programa[]>(ProgramaService.ENDPOINT_RAIZ_PROGRAMA).pipe(take(1));
    }


}