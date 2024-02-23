import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'sisedu-mensagem-sucesso',
  templateUrl: './mensagem-sucesso.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MensagemSucessoComponent implements OnInit {

  @Input()
  titulo: string;
  @Input()
  mensagem: string;

  @Input()
  linkNovoRegistro: string[];
  @Input()
  textoBotaoNovo: string;

  @Input()
  linkVoltar: string[];
  @Input()
  textoBotaoVoltar: string;

  constructor() { }

  ngOnInit(): void {
  }

}
