import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CrudGenericService } from 'app/core/crud-generic/crud-generic.service';
import { Injectable } from '@angular/core';
import { Curso } from '../model/curso.model';
import { Inscricao } from '../model/inscricao.model';
import { Estudante } from 'app/modules/admin/secretaria/estudante/model/estudante.model';
import { Conselho } from '../../conselho-de-classe/model/conselho.model';
import { Disciplina } from '../../disciplina/model/disciplina.model';
import { Turma } from '../model/turma.model';
import { Pagina } from 'app/shared/pagina.model';
import { DiasComAula } from '../model/dias-com-aula.model';


@Injectable({
  providedIn: 'root'
})
export class CursoService extends CrudGenericService<Curso> {
  
  
  constructor(http: HttpClient) {
    super(http, "curso")
  }

  inscreverEstudante(idTurma: number, uuidsEstudantes: string[]): Observable<Inscricao>{
    return this.http.post<Inscricao>(`${this.ENDPOINT}/inscricao/${idTurma}`, uuidsEstudantes).pipe(take(1))
  }

  listarInscricoesPorTurma(idCurso: number): Observable<Inscricao[]>{
    return this.http.get<Inscricao[]>(`${this.ENDPOINT}/inscricao/${idCurso}`).pipe()
  }

  listarEstudantesInscritosPorCurso(idCurso: number): Observable<Estudante[]>{
    return this.http.get<Estudante[]>(`${this.ENDPOINT}/inscricao/estudante/${idCurso}`).pipe()
  }

  atualizarInscricao(uuidEstudante: string, curso: Curso): Observable<Inscricao>{
    return this.http.put<Inscricao>(`${this.ENDPOINT}/inscricao/${uuidEstudante}`, curso).pipe(take(1))
  }

  desativarInscricao(idInscricao: number){
    return this.http.delete(`${this.ENDPOINT}/inscricao/${idInscricao}`).pipe(take(1))
  }

  listarEstudantesHabilitadosParaInscricao(idDisciplina: number): Observable<Estudante[]>{
    return this.http.get<Estudante[]>(`${this.ENDPOINT}/inscricao/disciplina-principal/${idDisciplina}`).pipe()
  }

  atualizarConselhoDeClasse(idConselho: number, conselho: Conselho): Observable<Conselho>{
    return this.http.put<Conselho>(`${this.ENDPOINT}/conselho/${idConselho}`, conselho).pipe(take(1))
  }

  buscarConselhoPorEstudante(idEstudante: string, idCurso: string): Observable<Conselho>{
    return this.http.get<Conselho>(`${this.ENDPOINT}/${idCurso}/conselho/estudante/${idEstudante}`).pipe(take(1))
  }

  buscarMeusCursos(): Observable<Pagina<Curso>>{
    return this.http.get<Pagina<Curso>>(`${this.ENDPOINT}/meus`).pipe(take(1))
  }

  buscarDiasAulasCursos(idCurso: number): Observable<DiasComAula[]>{
    return this.http.get<DiasComAula[]>(`${this.ENDPOINT}/${idCurso}/dias-aula-curso`).pipe(take(1))
  }
  
}
