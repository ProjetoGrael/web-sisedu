import { InstrutorDisciplina } from './../instrutores/model/instrutor-disciplina.model';
import { take } from 'rxjs/operators';
import { CrudGenericService } from "../../../../core/crud-generic/crud-generic.service";
import { Disciplina } from "./model/disciplina.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pagina } from "app/shared/pagina.model";
import { PlanoAula } from './model/plano-aula';

@Injectable({
    providedIn: 'root'
})
export class DisciplinaService extends CrudGenericService<Disciplina> {

    constructor(protected http: HttpClient) {
        super(http, 'disciplina');
    }

    buscarPorNome(nome: string): Observable<Pagina<Disciplina>> {
        return this.http
            .get<Pagina<Disciplina>>(`${this.ENDPOINT}?nome=${nome}`)
            .pipe(take(1));
    }

    todos(): Observable<Disciplina[]> {
        return this.http
            .get<Disciplina[]>(`${this.ENDPOINT}/todos`)
            .pipe(take(1));
    }

    buscarTodosInstrutoresAssociados(idDisciplina: number): Observable<InstrutorDisciplina[]> {
        return this.http.get<InstrutorDisciplina[]>(`${this.ENDPOINT}/${idDisciplina}/instrutor`)
            .pipe(take(1))
    }

    adicionarPlanoAula(planoAula: PlanoAula, idDisciplina: number): Observable<PlanoAula> {
        return this.http.post<PlanoAula>(`${this.ENDPOINT}/${idDisciplina}/plano-de-aula`, planoAula)
                        .pipe(take(1))
    }

    atualizarPlanoAula(planoAula: PlanoAula, idPlanoDeAula: number): Observable<PlanoAula> {
        return this.http.put<PlanoAula>(`${this.ENDPOINT}/plano-de-aula/${idPlanoDeAula}`, planoAula)
                        .pipe(take(1))
    }

    obterPlanoAulaPaginado(idCurso: number): Observable<Pagina<PlanoAula>> {
        return this.http.get<Pagina<PlanoAula>>(`${this.ENDPOINT}/${idCurso}/plano-de-aula`)
    }

}