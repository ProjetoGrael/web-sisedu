import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { Injectable } from '@angular/core';
import { Turma } from './model/turma.model';
import { Curso } from './model/curso.model';
import {Disciplina} from "../disciplina/model/disciplina.model";

@Injectable({
  providedIn: 'root'
})
export class TurmaService extends CrudGenericService<Turma> {
  
  
  constructor(http: HttpClient) {
    super(http, "turma")
  }

  adicionarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${this.ENDPOINT}/curso`, curso)
               .pipe(take(1))
  }

  buscarCursosCadastrados(idTurma: number): Observable<Curso[]>{
    return this.http.get<Curso[]>(`${this.ENDPOINT}/${idTurma}/curso`).pipe(take(1))
  }

  definirComoDisciplinaPrincipalComoSim(idTurma: number, idCurso: number): Observable<Curso>{
    return this.http.get<Curso>(`${this.ENDPOINT}/${idTurma}/curso/${idCurso}/disciplina-principal/sim`).pipe(take(1))
  }

  definirComoDisciplinaPrincipalComoNao(idTurma: number, idCurso: number): Observable<Curso>{
    return this.http.get<Curso>(`${this.ENDPOINT}/${idTurma}/curso/${idCurso}/disciplina-principal/nao`).pipe(take(1))
  }

  desativar(idCurso: number){
    return this.http.delete(`${this.ENDPOINT}/curso/${idCurso}`).pipe(take(1))
  }

  buscarCursoPorId(idCurso: number): Observable<Curso>{
    return this.http.get<Curso>(`${this.ENDPOINT}/curso/${idCurso}`).pipe(take(1))
  }

  editarCurso(idCurso, curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.ENDPOINT}/curso/${idCurso}`, curso).pipe(take(1))
  }

  listarDisciplinasPrincipais(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(`${this.ENDPOINT}/curso/disciplina-principal`).pipe(take(1))
  }

  
}
