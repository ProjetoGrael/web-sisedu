import { finalize } from 'rxjs/operators';
import { SituacaoFamiliar } from './../model/situacao-familiar.model';
import { obrigatorioValidator } from 'app/core/validator/obrigatorio.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EstudanteService } from '../estudante.service';
import { FuseLoadingService } from '@fuse/services/loading';
import { MensagemErro } from 'app/core/error/mensagem-erro.model';

@Component({
  selector: 'sisedu-situacao-familiar',
  templateUrl: './situacao-familiar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SituacaoFamiliarComponent implements OnInit {
  private _idEstudante: string = null;
  private _situacaoFamiliar = {} as SituacaoFamiliar; 
  private _isEditarSituacaoFamiliar: boolean = false;
  
  carregandoSituacaoFamiliar = false
  situacaoFamiliarForm: FormGroup;
  mensagemErro: string = ''
  
  
  
  constructor(private _formBuilder: FormBuilder,
    private _estudanteService: EstudanteService,
    private _router: Router,
    private _fuseLoading: FuseLoadingService,
    private _activatedRoute: ActivatedRoute) {
}

  ngOnInit(): void {

    this.situacaoFamiliarForm = this._formBuilder.group({
      numeroResidentes: [null, obrigatorioValidator],
      rendaFamiliar: [null, 0.00],
      nisPisNit: [null],
      estudanteTrabalhando: [false],
      nomeEmpresa: [null]
  });

    this._carregarSituacaoFamiliar();
  }

  isEstudanteTrabalhando(){
    return this.situacaoFamiliarForm.get('estudanteTrabalhando').value;
  }

  private _carregarSituacaoFamiliar(){
    this._idEstudante = this._activatedRoute.snapshot.params.id;
    if (this._idEstudante) {
      this._fuseLoading.show();
      this.carregandoSituacaoFamiliar = true;
      
      this._estudanteService.buscarSituacaoFamiliarPorIdEstudante(this._idEstudante)
                            .pipe(finalize(() =>{
                              this.carregandoSituacaoFamiliar = false
                              this._fuseLoading.hide();
                            }))
                            .subscribe(situacaoFamiliar => {
                              this._isEditarSituacaoFamiliar = true;
                              this.situacaoFamiliarForm.get('numeroResidentes').setValue(situacaoFamiliar.numeroResidentes);
                              this.situacaoFamiliarForm.get('rendaFamiliar').setValue(situacaoFamiliar.rendaFamiliar);
                              this.situacaoFamiliarForm.get('nisPisNit').setValue(situacaoFamiliar.nisPisNit);
                              this.situacaoFamiliarForm.get('estudanteTrabalhando').setValue(situacaoFamiliar.estudanteTrabalhando);
                              this.situacaoFamiliarForm.get('nomeEmpresa').setValue(situacaoFamiliar.nomeEmpresa);
                            }
                            )
    }
  }

  habilitarValidacaoNomeEmpresa(event){
    const nomeEmpresa = this.situacaoFamiliarForm.get("nomeEmpresa");
    
    if(event.checked){
      nomeEmpresa.addValidators(obrigatorioValidator);
      
      return;
    }

    nomeEmpresa.removeValidators(obrigatorioValidator);
    nomeEmpresa.updateValueAndValidity();
    nomeEmpresa.markAsUntouched();
    nomeEmpresa.setValue(null);
  }

  salvar(){
    this._situacaoFamiliar = this._payloadSituacaoFamiliar();

    if(this._isEditarSituacaoFamiliar){
      this._estudanteService.editarSituacaoFamiliar(this._idEstudante, this._situacaoFamiliar).subscribe(response => {
          this._router.navigateByUrl('/secretaria/estudante');
      }, exception => {
          this.mensagemErro = '';
    
          const error = exception.error as MensagemErro[];
    
          error.forEach((e) => {
            this.mensagemErro += e.mensagem + '\n';
          });
      }); 
      return;
    }


     this._estudanteService.inlcuirSituacaoFamiliar(this._idEstudante, this._situacaoFamiliar).subscribe(response => {
        this._router.navigateByUrl('/secretaria/estudante');
     }, exception => {
        this.mensagemErro = '';
  
        const error = exception.error as MensagemErro[];
  
        error.forEach((e) => {
          this.mensagemErro += e.mensagem + '\n';
        });
     });
  }

  private _payloadSituacaoFamiliar() {
    let formulario = Object.assign({}, this.situacaoFamiliarForm.value);

    let {numeroResidentes, rendaFamiliar, nisPisNit, estudanteTrabalhando, nomeEmpresa} = formulario;

    return {numeroResidentes, rendaFamiliar, nisPisNit, estudanteTrabalhando, nomeEmpresa} as SituacaoFamiliar
  }

  private _resterFormulario(){
    this.situacaoFamiliarForm.reset();
    this._situacaoFamiliar = {} as SituacaoFamiliar; 
  }

}
