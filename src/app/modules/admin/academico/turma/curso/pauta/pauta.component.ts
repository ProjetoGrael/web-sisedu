import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Presenca } from '../../model/presenca.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PautaHelperService } from 'app/core/helper/pauta-helper.service';
import { DateFormatDateToStringPipe } from 'app/core/pipe/data-format-date-to-string.pipe';
import { DateFormatStringToDatePipe } from 'app/core/pipe/data-format-string-to-date.pipe';
import { CursoService } from '../curso.service';
import { PautaService } from './pauta.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { MatPaginator } from '@angular/material/paginator';
import { PlanoAula } from '../../../disciplina/model/plano-aula';
import { Pagina } from 'app/shared/pagina.model';
import { DisciplinaService } from '../../../disciplina/disciplina.service';
import { Curso } from '../../model/curso.model';
import { SelectionModel } from '@angular/cdk/collections';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sisedu-pauta',
  templateUrl: './pauta.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PautaComponent implements OnInit {

  private _dateFormatDateToStringPipe: DateFormatDateToStringPipe = new DateFormatDateToStringPipe();
  private _dateFormatStringToDatePipe: DateFormatStringToDatePipe = new DateFormatStringToDatePipe();

  colunasPresenca: string[] = ['estudante', 'presenca', 'participacao'];
  displayedColumns: string[] = ['select', 'ordenacao', 'anotacoes', 'observacoes'];

  presencasTable: MatTableDataSource<Presenca>;

  dataPauta: string;

  situacoesPresenca: string[] = [];
  participacoes: string[] = [];
  presencas: Presenca[] = [];

  notasAula: string = null;
  observacoesAula: string = null;

  _idPlanoAula = null;
  _idTurma = null;
  _idCurso = null;
  _idPauta = null;

  mensagemErro = null;

  dataSourcePlanoAula: MatTableDataSource<PlanoAula>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  paginacao: Pagina<PlanoAula>;

  selection = new SelectionModel<PlanoAula>(true, []);
 
constructor(private _cursoService: CursoService,
    private _pautaService: PautaService,
    private _pautaHelper: PautaHelperService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _activatedRoute: ActivatedRoute,
    private _disciplinaService: DisciplinaService,
    private _router: Router) { }

  ngOnInit(): void {
    this._carregarSitucoesPresenca();
    this._carregarParticipacoes();

    this._idTurma = this._activatedRoute.snapshot.params.idTurma;
    this._idCurso = this._activatedRoute.snapshot.params.idCurso;
    this._idPauta = this._activatedRoute.snapshot.params.idPauta;
    this.dataPauta = this._activatedRoute.snapshot.params.dataPauta;

    if(this._idPauta){
      this._carregarPautaPorId();
    }else{
      this._carregaPresenca(null);
      this._carregarPlanosAula();
    }

  }

  private _carregarSitucoesPresenca() {
    this._pautaHelper.buscarSituacoesPresencao().subscribe(situacoesPresenca => this.situacoesPresenca = situacoesPresenca)
  }

  private _carregarParticipacoes() {
    this._pautaHelper.buscarParticipacoes().subscribe(participacoes => this.participacoes = participacoes)
  }

  private _carregarPautaPorId() {
    this._pautaService.buscarPautaPorId(this._idPauta).subscribe(pauta => {
      this._idPauta = pauta.id;
      this.dataPauta = this._dateFormatStringToDatePipe.transform(pauta.diaAula);
      this.notasAula = pauta?.notasAula;
      this.observacoesAula = pauta?.observacao;
      this._idPlanoAula = pauta.idPlanoAula;
      this._carregarPlanosAula();
      this._idCurso = pauta.idCurso;
      this._carregaPresenca(pauta);
    }, exception => {
      console.log(exception);
    });
  }

  private _carregaPresenca(pauta) {
    this._cursoService.listarEstudantesInscritosPorCurso(this._idCurso).subscribe(estudantes => {
      this.presencas = [];
      estudantes.forEach(estudante => {
        let presenca: Presenca = { id: null, situacao: null, participacao: null, estudante: estudante, pauta: null }
        this.presencas.push(presenca)
      })

      if (pauta) {
        pauta.presencas.forEach(presencaCadastrada => {
          let presencaEncontrado = this.presencas.find(presenca => presenca.estudante.id === presencaCadastrada.idEstudante);

          if (presencaCadastrada) {
            presencaEncontrado.id = presencaCadastrada.id
            presencaEncontrado.situacao = presencaCadastrada.situacao
            presencaEncontrado.participacao = presencaCadastrada.participacao
          }
        })
      }

      this.presencasTable = new MatTableDataSource<Presenca>(this.presencas);
    })

  }

  private _carregarPlanosAula(){
    this._cursoService.buscarPorId<Curso>(this._idCurso).subscribe(curso => {
      const idDisciplina = curso.instrutorDisciplina.disciplina.id;
      
      this._disciplinaService.obterPlanoAulaPaginado(idDisciplina)
      .pipe(
        finalize(() => {
          const planoAulaCadastrado = this.dataSourcePlanoAula.data.find(planoAula => planoAula.id === this._idPlanoAula);
          this.selection.select(planoAulaCadastrado);
        })
      )
      .subscribe(planosAulaPaginado => {
        this.paginacao = planosAulaPaginado
  
        this.dataSourcePlanoAula = new MatTableDataSource<PlanoAula>(
          this.paginacao.conteudo
        );
  
        this.dataSourcePlanoAula.paginator = this.paginator; 
      })
    });
  }

  private _incluirPresenca(idEstudante, situacao: string) {
    let presencaSelecionada = this.presencas.find(presenca => presenca.estudante.id === idEstudante);
    presencaSelecionada.situacao = situacao;

    if (situacao !== 'Atrasado' && situacao !== 'Presente') {
      presencaSelecionada.participacao = null;
    }
  }

  private _incluirParticipacao(idEstudante, participacao: string) {
    let presencaSelecionada = this.presencas.find(presenca => presenca.estudante.id === idEstudante);
    presencaSelecionada.participacao = participacao;
  }

  private _habilitarParticipacao(idEstudante) {
    let presencaSelecionada = this.presencas.find(presenca => presenca.estudante.id === idEstudante);
    return presencaSelecionada.situacao === 'Atrasado' || presencaSelecionada.situacao === 'Presente';
  }

  salvar() {
    if(!this._idPlanoAula){
      this.mensagemErro = "O Plano de Aula não foi selecionado"
      return;
    }


    if (this._idPauta) {
      this._atualizarPauta();
      return;
    }

    this._incluirPauta();
  }

  private _incluirPauta() {
    this._pautaService.salvarPauta(this._payload()).subscribe(
      (pauta) => {    
        this.dialogConfirmacaoPautaSalvaComSucesso();
        this.mensagemErro = null;
      },
      (exception) => {
        console.log(exception)
        this.mensagemErro = exception.error.mensagem
      })
  }

  private _atualizarPauta() {
    this._pautaService.atualizarPauta(this._idPauta, this._payload()).subscribe(
      (pauta) => {
        this.dialogConfirmacaoPautaSalvaComSucesso();
        this.mensagemErro = null;
      }, (exception) => {
        console.log(exception)
        this.mensagemErro = exception.error.mensagem
      })
  }

  private _payload() {
    return {
      id: this._idPauta,
      diaAula: this._dateFormatDateToStringPipe.transform(this.dataPauta),
      idCurso: this._idCurso,
      idPlanoAula: this._idPlanoAula,
      notasAula: this.notasAula,
      observacao: this.observacoesAula,
      presencas: this._payloadPresenca()
    }
  }

  private _payloadPresenca() {
    return this.presencas.map(presenca => {
      return {
        id: presenca.id,
        idEstudante: presenca.estudante.id,
        participacao: presenca.participacao,
        situacao: presenca.situacao
      }
    })
  }

  setNotasAula(event: any) {
    this.notasAula = event.target.value
  }

  setObservacoesAula(event: any) {
    this.observacoesAula = event.target.value;
  }

  dialogConfirmacaoPautaSalvaComSucesso() {
    const dialogRef = this._fuseConfirmationService.open({
      title: "Sucesso",
      message: 'Pauta salva com sucesso',
      icon: {
        show: true,
        name: "heroicons_outline:exclamation",
        color: "success",
      },
      actions: {
        confirm: {
          show: true,
          label: "OK",
          color: "primary",
        },
        cancel: {
          show: false,
        }
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._router.navigate(["/academico/turma/meus-cursos"])
      }
    });
  }

  toggle(planoAula: PlanoAula) {
    this._idPlanoAula = planoAula.id;

    this.selection.toggle(planoAula);

    // Desmarcar todos os outros itens se o novo item estiver selecionado
    if (this.selection.isSelected(planoAula)) {
      this.dataSourcePlanoAula.data.forEach(item => {
        if (item !== planoAula) {
          this.selection.deselect(item);
        }
      });
    }

    this.mensagemErro = null;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSourcePlanoAula.data.length;
    return numSelected === numRows;
  }

}
