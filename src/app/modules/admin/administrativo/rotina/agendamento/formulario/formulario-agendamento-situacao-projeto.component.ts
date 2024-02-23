import { obrigatorioValidator } from "./../../../../../../core/validator/obrigatorio.validator";
import { RotinaService } from "./../../rotina.service";
import { Agendamento } from "./../../model/agendamento.model";
import { DataHora } from "./../../../../../../core/helper/model/data-hora.model";
import { DataHoraHelperService } from "./../../../../../../core/helper/data-hora-helper.service";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { FuseAlertService, FuseAlertType } from "@fuse/components/alert";
import { StatusProjetoHelperService } from "app/core/helper/status-projeto-helper.service";
import { StatusProjeto } from "app/core/helper/model/status-projeto.model";

@Component({
  selector: "sisedu-formulario",
  templateUrl: "./formulario-agendamento-situacao-projeto.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class FormularioAgendamentoSituacaoProjetoComponent implements OnInit {
  displayedColumns: string[] = ["agendamento", "ativo", "opcoes"];

  agendamentoForm: FormGroup;
  dataHora: DataHora;
  statusProjeto: StatusProjeto[] = [];

  agendamentos: Agendamento[] = [];
  agendamento = {} as Agendamento;
  reagendamento: boolean = false;

  private _idPeriodo: number;
  private _idTarefaSituacaoProjeto: number;

  private _id: string;

  alert: { type: FuseAlertType; message: string } = {
    type: "success",
    message: "",
  };

  showAlert: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _dataHoraHelperService: DataHoraHelperService,
    private _statusProjetoHelperService: StatusProjetoHelperService,
    private _rotinaService: RotinaService
  ) {}

  ngOnInit(): void {
    this._id = this._activatedRoute.snapshot.params.id;

    this.agendamentoForm = this._formBuilder.group({
      minuto: [undefined],
      hora: [undefined],
      diaMes: [undefined],
      mes: [undefined],
      statusAtual: [undefined],
      proximoStatus: [undefined],
    });

    this._carregarDataHoraHelper();
    this._carregarStatusProjeto();
    this._carregarAgendamentos();
  }

  private _carregarDataHoraHelper() {
    this._dataHoraHelperService.buscarDataHora().subscribe(
      (dataHora) => {
        this.dataHora = dataHora;
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

  private _carregarStatusProjeto() {
    this._statusProjetoHelperService.getStatusProjeto().subscribe(
      (statusProjeto) => {
        this.statusProjeto = statusProjeto;
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

  private _carregarAgendamentos() {
    this._rotinaService.buscarAgendamentos(this._id).subscribe(
      (agendamentos) => {
        this.agendamentos = agendamentos;
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

  agendar() {
    this.agendamento = this._payloadAgendamento();

    if (this.agendamentoForm.valid) {
      if (this.reagendamento) {
        this._rotinaService
          .reagendar(
            this._idPeriodo,
            this._idTarefaSituacaoProjeto,
            this.agendamento
          )
          .subscribe(
            (mensagemSucesso) => {
              
              this._carregarAgendamentos();
              this.resetar();
              this.agendamento = {} as Agendamento;
              this.reagendamento = false;
              this._idPeriodo = undefined;
              this._idTarefaSituacaoProjeto = undefined;

              this.alert = {
                type: "success",
                message: mensagemSucesso.mensagem,
              };            
              this.showAlert = true
              
            },
            (exception) => {

              this.alert = {
                type: "warn",
                message: exception.error.mensagem,
              };
              this.showAlert = true
            }
          );

        return;
      }

      this._rotinaService.agendar(this._id, this.agendamento).subscribe(
        (mensagemSucesso) => {

          this.alert = {
            type: "success",
            message: mensagemSucesso.mensagem,
          };
          this.showAlert = true

          this._carregarAgendamentos();
          this.resetar();
          this.agendamento = {} as Agendamento;
        },
        (exception) => {

          
          this.alert = {
            type: "warn",
            message: "Todos os campos são obrigatórios",
          };
          this.showAlert = true
          
        }
      );
    }
  }

  private _payloadAgendamento(): Agendamento {
    let formularioAgendamento = Object.assign({}, this.agendamentoForm.value);

    const { minuto, hora, diaMes, mes, statusAtual, proximoStatus } =
      formularioAgendamento;

    return {
      periodo: {
        minuto,
        hora,
        diaMes,
        mes,
      },
      tarefaSituacaoProjeto: {
        statusAtual,
        proximoStatus,
      },
    };
  }

  ativar(id: number) {
    this._rotinaService.ativarAgendamento(id).subscribe(
      (response) => {
        this._carregarAgendamentos();
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

  desativar(id: number) {
    this._rotinaService.desativarAgendamento(id).subscribe(
      (response) => {
        this._carregarAgendamentos();
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

  reagendar(agendamento: Agendamento) {
    this._idPeriodo = agendamento.periodo?.id;
    this._idTarefaSituacaoProjeto = agendamento.tarefaSituacaoProjeto?.id;

    //O sinal de + converte string para number
    this.agendamentoForm.get("minuto").setValue(+agendamento.periodo.minuto);
    this.agendamentoForm.get("hora").setValue(+agendamento.periodo.hora);
    this.agendamentoForm.get("diaMes").setValue(+agendamento.periodo.diaMes);
    this.agendamentoForm.get("mes").setValue(agendamento.periodo.mes);
    this.agendamentoForm .get("statusAtual").setValue(agendamento.tarefaSituacaoProjeto.statusAtual);
    this.agendamentoForm.get("proximoStatus").setValue(agendamento.tarefaSituacaoProjeto.proximoStatus);

    this.reagendamento = true;
  }

  cancelar() {
    this._idPeriodo = undefined;
    this._idTarefaSituacaoProjeto = undefined;
    this.agendamentoForm.reset();
    this.reagendamento = false;
  }

  resetar(){
    this.agendamentoForm.reset();
  }

}
