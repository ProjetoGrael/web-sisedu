import { PeriodoLetivo } from './../model/periodo-letivo.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { PeriodoLetivoService } from '../periodo-letivo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { obrigatorioValidator } from 'app/core/validator/obrigatorio.validator';
import { DiaSemAula } from '../model/dia-sem-aula.model';
import { MensagemErro } from 'app/core/error/mensagem-erro.model';
import { DateFormatDateToStringPipe } from 'app/core/pipe/data-format-date-to-string.pipe';

@Component({
  selector: 'sisedu-dia-sem-aula',
  templateUrl: './dia-sem-aula.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DiaSemAulaComponent implements OnInit {


  mensagemErro: string = ''
  colunasDiasSemAula: string[] = ['descricao', 'data', 'opcao'];

  diasSemAula = [];
  periodoLetivo: PeriodoLetivo;

  diasSemAulaForm: FormGroup;

  private _idPeriodoLetivo = null;
  private _dateFormatDateToStringPipe: DateFormatDateToStringPipe = new DateFormatDateToStringPipe();

  constructor(
    private _formBuilder: FormBuilder,
    private _periodoLetivoService: PeriodoLetivoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fuseLoadingService: FuseLoadingService) { }

  ngOnInit(): void {

    this.diasSemAulaForm = this._formBuilder.group({
      descricao: [null, obrigatorioValidator],
      dia: [null, obrigatorioValidator]
    });

    this._carregarDadosPeriodoLetivo();
  }

  private _carregarDadosPeriodoLetivo() {
    this._idPeriodoLetivo = this._activatedRoute.snapshot.params.id;

    if (this._idPeriodoLetivo) {
      this._periodoLetivoService.buscarPorId<PeriodoLetivo>(this._idPeriodoLetivo).subscribe(periodoLetivo => {
        this.periodoLetivo = periodoLetivo;
        this._carregarDiasSemAula();
      }, exception => {
        this.mensagemErro = 'Não foi possível carregar os dados do Periodo Letivo'
      });
    }
  }

  adicionar() {
    const diaSemAula = this._payloadPeriodo();

    this._periodoLetivoService.cadastrarDiaSemAula(diaSemAula)
      .subscribe(
        (diaSemAula) => {
          this._carregarDiasSemAula();
          this.diasSemAulaForm.reset();
        }, (exception) => {
          const error = exception.error as MensagemErro;
          this.mensagemErro = error.mensagem;
        });
  }

  private _carregarDiasSemAula() {
    this._periodoLetivoService.buscarDiasSemAulaPorNomePeriodo(this.periodoLetivo.nome).subscribe(diasSemAula => {
      this.diasSemAula = diasSemAula;
    }, exception => {
      console.log(exception);
    })
  }

  private _payloadPeriodo(): DiaSemAula {
    let formulario = Object.assign({}, this.diasSemAulaForm.value);

    const {
      descricao,
      dia,
    } = formulario;

    return {
      descricao,
      dia: this._dateFormatDateToStringPipe.transform(dia),
      periodoLetivo: this.periodoLetivo
    } as DiaSemAula;
  }

  deletar(idDiaSemAula: number){
      this._periodoLetivoService.deletarDiaSemAula(idDiaSemAula).subscribe(response => {
        this._carregarDiasSemAula();
      }, exception => {
        console.log(exception);
      });
  }

}
