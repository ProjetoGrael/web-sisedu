import { PeriodoLetivo } from './../../../academico/periodo-letivo/model/periodo-letivo.model';
import { PeriodoLetivoService } from './../../../academico/periodo-letivo/periodo-letivo.service';
import { obrigatorioValidator } from './../../../../../core/validator/obrigatorio.validator';
import { tamanhoMinimoValidator } from 'app/core/validator/tamanho.validator';
import { finalize } from 'rxjs/operators';
import { MensagemErro } from 'app/core/error/mensagem-erro.model';
import { TurmaService } from './../turma.service';
import { Turma } from './../model/turma.model';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';

@Component({
  selector: 'sisedu-formulario-turma',
  templateUrl: './formulario-turma.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormularioTurmaComponent implements OnInit {
  turmaForm: FormGroup;
  carregandoDadosTurma: boolean = false;
  mensagemErro: string = ''
  periodosLetivos = [] as PeriodoLetivo[];
  
  private turma = {} as Turma; 
  _id: number = null;

  constructor(private _formBuilder: FormBuilder,
             private _activatedRoute: ActivatedRoute,
             private _fuseLoading: FuseLoadingService,
             private _router: Router,
             private _turmaService: TurmaService,
             private _periodoLetivoService: PeriodoLetivoService) { }

  ngOnInit(): void {
    this.turmaForm = this._formBuilder.group(
      {
        periodoLetivo: [null, obrigatorioValidator],
        nomeFantasia: [null, [tamanhoMinimoValidator(3), obrigatorioValidator]],
        comentario: [null]
      }
    );

    this._carregarTurma();
    this._carregarPeriodoLetivo();
  }

  private _carregarPeriodoLetivo(){
    this._periodoLetivoService.buscarPeridosValidos().subscribe(
      periodosLetivos => this.periodosLetivos = periodosLetivos
    );
  }

  private _carregarTurma(){
    this._id = this._activatedRoute.snapshot.params.id;
    if(this._id){
      this.carregandoDadosTurma = true;
      this._fuseLoading.show();


      return this._turmaService.buscarPorId<Turma>(this._id)
                                   .pipe(finalize(() =>{
                                       this.carregandoDadosTurma = false;
                                       this._fuseLoading.hide();
                                   })
                                   ).subscribe((turma) => {
                                      this.turmaForm.get("nomeFantasia").setValue(turma.nomeFantasia);
                                      this.turmaForm.get("comentario").setValue(turma.comentario);
                                      this.turmaForm.get("periodoLetivo").setValue(turma.periodoLetivo.id);
                                   })

    }
  }

  salvar(){
    this.turma = this._payloadTurma();

    if(this._id){
      this._turmaService.atualizar(this._id, this.turma).subscribe(
        response => {
          this._resterFormulario();
          this._router.navigateByUrl("/academico/turma");
        }, exception => {
          const error = exception.error as MensagemErro;
          this.mensagemErro = error.mensagem;
        }
      )

      return;
    }

    this._turmaService.salvar(this.turma).subscribe(
      response => {
        this._resterFormulario();
        this._router.navigateByUrl("/academico/turma");
      }, exception => {
        const error = exception.error as MensagemErro;
        this.mensagemErro = error.mensagem;
      }
    )

  }

  private _payloadTurma() {
    let formulario = Object.assign({}, this.turmaForm.value);

    const {nomeFantasia, comentario, periodoLetivo} = formulario;

    return {nomeFantasia, comentario, periodoLetivo: {id: periodoLetivo as number}} as Turma
  }

  private _resterFormulario(){
    this.turmaForm.reset();
    this.turma= {} as Turma;
  }

}
