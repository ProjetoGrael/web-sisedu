import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {obrigatorioValidator} from "../../../core/validator/obrigatorio.validator";

@Component({
  selector: 'sisedu-erro',
  templateUrl: './erro.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ErroComponent implements OnInit {

  @Input()
  campo: AbstractControl;

  @Input()
  campoObrigatorio: boolean;

  constructor() { }

  ngOnInit(): void {

  }
  public isErro = () => {
    return this.campo?.invalid && this.campo?.touched;
  }

}
