import {CrudGenericService} from "../../../../core/crud-generic/crud-generic.service";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { PeriodoLetivo } from "./model/periodo-letivo.model";
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import { StatusPeriodoLetivo } from "./model/status-periodo-letivo.model";
import { DiaSemAula } from "./model/dia-sem-aula.model";

@Injectable({
    providedIn: 'root'
})
export class PeriodoLetivoService extends CrudGenericService<PeriodoLetivo> {


    constructor(protected http: HttpClient) {
        super(http, 'periodo-letivo');
    }

    buscarAnosPeriodosLetivos(): Observable<Number[]> {
        return this.http.get<Number[]>(`${CrudGenericService.API_URL}/periodo-letivo/ano`).pipe(take(1));
    }

    listarStatusPeriodoLetivo(): Observable<StatusPeriodoLetivo[]> {
        return this.http.get<StatusPeriodoLetivo[]>(`${CrudGenericService.API_URL}/periodo-letivo/status`).pipe(take(1));
    }

    buscarTodos(): Observable<PeriodoLetivo[]> {
        return this.http
                   .get<PeriodoLetivo[]>(`${CrudGenericService.API_URL}/periodo-letivo/todos`)
                   .pipe(take(1));
    }

    buscarPeridosValidos(): Observable<PeriodoLetivo[]> {
        return this.http
                   .get<PeriodoLetivo[]>(`${CrudGenericService.API_URL}/periodo-letivo/validos`)
                   .pipe(take(1));
    }

    cadastrarDiaSemAula(diaSemAula: DiaSemAula): Observable<DiaSemAula>{
        return this.http.post<DiaSemAula>(`${CrudGenericService.API_URL}/periodo-letivo/dia-sem-aula`, diaSemAula)
    }

    buscarDiasSemAulaPorNomePeriodo(nomePeriodoLetivo: string): Observable<DiaSemAula[]>{
        return this.http
                   .get<DiaSemAula[]>(`${CrudGenericService.API_URL}/periodo-letivo/dia-sem-aula/periodo/${nomePeriodoLetivo}`)
                   .pipe(take(1));
    }

    deletarDiaSemAula(idDiaSemAula: number): Observable<any>{
        return this.http.delete(`${CrudGenericService.API_URL}/periodo-letivo/dia-sem-aula/${idDiaSemAula}`)
    }

}