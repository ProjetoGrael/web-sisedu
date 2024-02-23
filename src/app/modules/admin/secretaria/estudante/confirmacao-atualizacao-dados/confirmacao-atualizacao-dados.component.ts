import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {Estudante} from "../model/estudante.model";

@Component({
  selector: 'sisedu-confirmacao-atualizacao-dados',
  templateUrl: './confirmacao-atualizacao-dados.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ConfirmacaoAtualizacaoDadosComponent implements OnInit {

  mensagem: string;
  nome: string;
  id: string;

  constructor(private _router: Router) {
    const nav = this._router.getCurrentNavigation();
    if(nav){
      const estudante = nav.extras.state.estudante as Estudante;

      this.nome = `${estudante.nome} ${estudante.sobrenome}`;
    }
  }

  ngOnInit(): void {
    this.mensagem = `Os dados do estudante ${this.nome} foram atualizados com sucesso.`
  }

}
