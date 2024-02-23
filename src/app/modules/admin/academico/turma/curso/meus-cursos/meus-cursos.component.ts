import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from '../../model/curso.model';
import { CursoService } from '../curso.service';
import { ActivatedRoute } from '@angular/router';
import { Pagina } from 'app/shared/pagina.model';
import moment from 'moment';
import { finalize } from 'rxjs/operators';
import { Estudante } from 'app/modules/admin/secretaria/estudante/model/estudante.model';
import { PautaHelperService } from 'app/core/helper/pauta-helper.service';
import { Presenca } from '../../model/presenca.model';
import { PautaService } from '../pauta/pauta.service';
import { DateFormatDateToStringPipe } from 'app/core/pipe/data-format-date-to-string.pipe';
import { TurmaService } from '../../turma.service';
import { DateFormatStringToDatePipe } from 'app/core/pipe/data-format-string-to-date.pipe';
import { DateFormatYYYYMMDDDateToStringPipe } from 'app/core/pipe/data-format-yyy-mm-dd-date-to-string.pipe';

@Component({
  selector: 'sisedu-meus-cursos',
  templateUrl: './meus-cursos.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MeusCursosComponent implements OnInit {
  private _dateFormatDateToStringPipe: DateFormatDateToStringPipe = new DateFormatDateToStringPipe();
  private _dateYYYYMMDDFormatStringToDatePipe: DateFormatYYYYMMDDDateToStringPipe = new DateFormatYYYYMMDDDateToStringPipe();

  colunasMeusCursos: string[] = ['disciplina', 'turma', 'periodo_letivo', 'opcao'];
  colunasPresenca: string[] = ['estudante', 'presenca', 'participacao'];

  cursos: MatTableDataSource<Curso>;
  paginacao: Pagina<Curso>;
 
  habilitarCalendario = false
  habilitarBotaoCadastrarPauta = true
  datasDisponiveis: string[] = [];
  dataPautaSelecionada: Date;
  idCursoSelecionado = null;

  mensagemErro: string = null;
  idTurma = null;
  isErroPlanoAula = false;
  idPauta = null;
  pautaSalvaComSucesso = false;

  cursoSelecionado: Curso;

  constructor(private _cursoService: CursoService,
    private _pautaService: PautaService) { }

  ngOnInit(): void {
    this._carregarCursos();
  }

  private _carregarCursos() {
    this._cursoService.buscarMeusCursos().subscribe(cursos => {
      this.paginacao = cursos
      this.cursos = new MatTableDataSource<Curso>(this.paginacao.conteudo);
    });
  }

  carregarDiasAula(idCurso: number, idTurma: number) {
    this.idCursoSelecionado = idCurso;
    this.idTurma = idTurma;
    this.habilitarCalendario = false;

    this._carregarCurso(idCurso);
    
    this._cursoService.buscarDiasAulasCursos(idCurso)
      .pipe(
        finalize(() => this._reset())
      ).subscribe(diasComAula => {
        this.datasDisponiveis = diasComAula.map(dia => dia.dia);
      });
  }

  private _carregarCurso(idCurso: number){
    this.cursoSelecionado = this.paginacao.conteudo.find(curso => curso.id === idCurso);
  }

  filtroDatasDisponiveis = (date: Date | null): boolean => {
    if (!date) return false;
    return this.datasDisponiveis.includes(moment(date).format('DD/MM/YYYY'));
  }

  selecionarData(event) {
    this.dataPautaSelecionada = event;
    this.habilitarBotaoCadastrarPauta = false;
    this._carregarPauta();
  }


  private _carregarPauta(){
    this.idPauta = null;

    this._pautaService.buscarPautaPorIdCursoEDataPauta(this.idCursoSelecionado, this._dateFormatDateToStringPipe.transform(this.dataPautaSelecionada)).subscribe(pauta => {
      this.idPauta = pauta.id;
    }, exception => {
        console.log(exception)
    });
  }

  private _reset() {
    this.habilitarCalendario = true;
    this.habilitarBotaoCadastrarPauta = true;
    this.dataPautaSelecionada = null;
    this.idPauta = null;
    this.mensagemErro = null
  }

  cadastrarPauta(){

    if(this.idPauta){
      return `/academico/turma/${this.idTurma}/curso/${this.idCursoSelecionado}/pauta/${this.idPauta}/edicao`
    }

    const dataPauta = this._dateYYYYMMDDFormatStringToDatePipe.transform(this.dataPautaSelecionada);
    
    return `/academico/turma/${this.idTurma}/curso/${this.idCursoSelecionado}/pauta/${dataPauta}/novo`
  }

}
