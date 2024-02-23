import { finalize } from 'rxjs/operators';
import { Instrutor } from './../model/instrutor.model';
import { tamanhoMinimoValidator } from 'app/core/validator/tamanho.validator';
import { tamanhoMaximoValidator } from './../../../../../core/validator/tamanho.validator';
import { obrigatorioValidator } from './../../../../../core/validator/obrigatorio.validator';
import { InstrutoresService } from './../instrutores.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { MensagemErro } from 'app/core/error/mensagem-erro.model';

@Component({
  selector: 'sisedu-formulario-instrutor',
  templateUrl: './formulario-instrutor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class FormularioInstrutorComponent implements OnInit {

  instrutorForm: FormGroup;
  carregandoDadosInstrutor: boolean = false;
  mensagemErro: string = ''
  
  private instrutor = {} as Instrutor; 
  private _id: number = null;

  constructor(private _instrutorService: InstrutoresService,
              private _formBuilder: FormBuilder,
              private _activatedRoute: ActivatedRoute,
              private _fuseLoading: FuseLoadingService,
              private _router: Router,) { }

  ngOnInit(): void {
    this.instrutorForm = this._formBuilder.group(
      {
        nome: [null, [tamanhoMinimoValidator(3), obrigatorioValidator]],
        celular: [null, obrigatorioValidator]
      }
    );

    this._carregarInstrutor();
  }

  salvar(){
    this.instrutor = this._payloadInstrutor();

    if(this._id){
      this._instrutorService.atualizar(this._id, this.instrutor).subscribe(
        (response) =>{
          this._resetarFormulario();
          this._router.navigateByUrl("/academico/instrutor");
        },
        (exception) => {
          const error = exception.error as MensagemErro;
          this.mensagemErro = error.mensagem;
        }
      )
      
      return;
    }

    this._instrutorService.salvar(this.instrutor).subscribe(
    (response) => {
      this._resetarFormulario();
      this._router.navigateByUrl(
        "/academico/instrutor"
      );
    }, (exception) => {
      const error = exception.error as MensagemErro;
      this.mensagemErro = error.mensagem;
    })

  }

  private _carregarInstrutor(){
    this._id = this._activatedRoute.snapshot.params.id;
    if(this._id){
      this.carregandoDadosInstrutor = true;
      this._fuseLoading.show();


      return this._instrutorService.buscarPorId<Instrutor>(this._id)
                                   .pipe(finalize(() =>{
                                       this.carregandoDadosInstrutor = false;
                                       this._fuseLoading.hide();
                                   })
                                   ).subscribe((instrutor) => {
                                      this.instrutorForm.get("nome").setValue(instrutor.nome);
                                      this.instrutorForm.get("celular").setValue(instrutor.celular);
                                   })

    }
  }

  private _payloadInstrutor() {
    let formulario = Object.assign({}, this.instrutorForm.value);
    const {nome, celular} = formulario;

    return {nome, celular}
  }

  private _resetarFormulario(){
    this.instrutorForm.reset();
    this.instrutor = {} as Instrutor;
  }

}
