import { SituacaoProjetoService } from './../situacao-projeto.service';
import { FormControl } from '@angular/forms';
import { StatusProjeto } from './../../../../../core/helper/model/status-projeto.model';
import { StatusProjetoHelperService } from '../../../../../core/helper/status-projeto-helper.service';
import { SituacaoProjeto } from './../model/situacao-projeto.model';
import { Observable } from 'rxjs/internal/Observable';
import { EstudanteService } from './../estudante.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FuseLoadingService } from '@fuse/services/loading';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sisedu-situacao-projeto',
  templateUrl: './situacao-projeto.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SituacaoProjetoComponent implements OnInit {

  private _id: string = null;
  
  situacoesProjeto$: Observable<SituacaoProjeto[]>;
  alteracao: boolean = false;
  alteracaoData: boolean[] = [];
  novaDataSituacao: Date;

  statusProjeto: StatusProjeto[] = [];
  botaoIncluir: boolean = false;

  anoIngresso: number = 0;
  statusProjetoSelecionado = new FormControl(null);

  mensagemErro: string = null;

  constructor(private _estudanteService: EstudanteService, 
              private _statusProjetoHelperService: StatusProjetoHelperService,
              private _situacaoProjetoService: SituacaoProjetoService,
              private _activatedRoute: ActivatedRoute,
              private _fuseLoadingService: FuseLoadingService) {
        
  }

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.params.id;
    if(this._id){
      this._carregarSituacoesProjeto();
      this._statusProjetoHelperService.getStatusProjeto().subscribe(statusProjeto => this.statusProjeto = statusProjeto)
    }
  }

  private _carregarSituacoesProjeto(){
    this._fuseLoadingService.show();
    this.situacoesProjeto$ = this._estudanteService.buscarSituacoesProjeto(this._id).pipe(finalize(() => this._fuseLoadingService.hide()));
  }

  alterar(visivel: boolean = true){
     this.alteracao = visivel;
  }

  visibilidadeBotaoIncluir(visivel: boolean = true){
    this.botaoIncluir = visivel;
  }

  setAnoIngresso(anoIngresso: number){
    this.anoIngresso = anoIngresso;
  }

  incluir(){
    const situacaoProjeto = {status: this.statusProjetoSelecionado.value, anoIngresso: this.anoIngresso} as SituacaoProjeto;

    this._estudanteService.inluirSituacaoProjeto(this._id, situacaoProjeto).subscribe(situacaoProjeto => {
       this.visibilidadeBotaoIncluir(false);
       this.alterar(false);
       this._carregarSituacoesProjeto();
    }, exception => {
      this.mensagemErro = exception.mensagem  
    })

  }

  alterarData(index, id: number){
    this.alteracaoData[index] = false
    const situacaoProjeto =  {dataInclusao: this.novaDataSituacao} as SituacaoProjeto
    this._situacaoProjetoService.atualizar(id, situacaoProjeto).subscribe(situacaoProjeto => {
      this.novaDataSituacao = null;
      this._carregarSituacoesProjeto();    
    }, exception => {
      this.mensagemErro = exception.error[0].mensagem;
      this.novaDataSituacao = null;
    }
    )
  }

}
