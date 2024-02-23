import { RotinaService } from "./../rotina.service";
import { TipoRotina } from "./../model/tipo-rotina.model";
import { TipoRotinaService } from "./../tipo-rotina.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { obrigatorioValidator } from "app/core/validator/obrigatorio.validator";
import { tamanhoMinimoValidator } from "app/core/validator/tamanho.validator";
import { Rotina } from "../model/rotina.model";
import { ActivatedRoute, Router } from "@angular/router";
import { FuseAlertType } from "@fuse/components/alert";
import { timeoutWith } from "rxjs/operators";

@Component({
  selector: "sisedu-formulario-rotina",
  templateUrl: "./formulario-rotina.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormularioRotinaComponent implements OnInit {
  rotinaForm: FormGroup;
  tiposRotinas: TipoRotina[];
  rotina: Rotina;

  private _id: string;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _tipoRotinaServico: TipoRotinaService,
    private _rotinaService: RotinaService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rotinaForm = this._formBuilder.group({
      nome: [undefined, [tamanhoMinimoValidator(3), obrigatorioValidator]],
      tipoRotina: [undefined, obrigatorioValidator],
    });

    this._carregarTipoRotina();
    this._carregarRotina();
  }

  private _carregarRotina() {
    this._id = this._activatedRoute.snapshot.params.id;
    if (this._id) {
      this._rotinaService.buscarPorId<Rotina>(this._id).subscribe(
        (rotina) => {
          this.rotinaForm.get("nome").setValue(rotina.nome);
          this.rotinaForm.get("tipoRotina").setValue(rotina.tipoRotina.nome);
        },
        (exception) => {
          this.alert = {
            type: "warn",
            message: exception.error.mensagem,
          };
          this.showAlert = true;
        }
      );
    }
  }

  private _carregarTipoRotina() {
    this._tipoRotinaServico.listar<TipoRotina>().subscribe(
      (tiposRotinas) => {
        this.tiposRotinas = tiposRotinas;
      },
      (exception) => {}
    );
  }

  salvar() {
    let formulario = Object.assign({}, this.rotinaForm.value);
    const { nome, tipoRotina } = formulario;

    this.rotina = {
      nome: nome,
      tipoRotina: {
        nome: tipoRotina,
      },
    } as Rotina;

    if (this._id) {
      this._rotinaService.atualizar(this._id, this.rotina).subscribe(
        (rotina) => {
          this._router.navigateByUrl("/administrativo/rotina");
          this._resetarFormulario();
        },
        (exception) => {
          this.alert = {
            type: "warn",
            message: exception.error.mensagem,
          };
          this.showAlert = true;
        }
      );
      return;
    }

    this._rotinaService.salvar(this.rotina).subscribe(
      (rotina) => {
        this._router.navigateByUrl("/administrativo/rotina");
        this._resetarFormulario();
      },
      (exception) => {
        this.alert = {
          type: "warn",
          message: exception.error.mensagem,
        };
        this.showAlert = true;
      }
    );
  }

  private _resetarFormulario() {
    this.rotinaForm.reset();
    this.rotina = {} as Rotina;
  }
}
