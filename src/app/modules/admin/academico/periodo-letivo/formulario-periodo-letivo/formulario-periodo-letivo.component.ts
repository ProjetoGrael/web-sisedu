import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {PeriodoLetivo} from "../model/periodo-letivo.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PeriodoLetivoService} from "../periodo-letivo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {FuseLoadingService} from "@fuse/services/loading";
import {StatusPeriodoLetivo} from "../model/status-periodo-letivo.model";
import {finalize} from "rxjs/operators";
import {MensagemErro} from "app/core/error/mensagem-erro.model";
import {DateFormatStringToDatePipe} from "../../../../../core/pipe/data-format-string-to-date.pipe";
import {DateFormatDateToStringPipe} from "../../../../../core/pipe/data-format-date-to-string.pipe";

@Component({
    selector: "sisedu-formulario-periodo-letivo",
    templateUrl: "./formulario-periodo-letivo.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class FormularioPeriodoLetivoComponent implements OnInit {
    private periodoLetivo = {} as PeriodoLetivo;
    private _id: string = null;
    private _dateFormatDateToStringPipe: DateFormatDateToStringPipe =
        new DateFormatDateToStringPipe();
    private _dateFormatStringToDatePipe: DateFormatStringToDatePipe =
        new DateFormatStringToDatePipe();

    statusPeriodo: StatusPeriodoLetivo[] = [];

    periodoLetivoForm: FormGroup;
    mensagemErro: string = "";
    botaoSalvarDesabilitado = false;
    carregandoDados = false;
    existePeriodo = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _periodoLetivoService: PeriodoLetivoService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _activatedRoute: ActivatedRoute,
        private _fuseLoading: FuseLoadingService,
    ) {
    }

    ngOnInit(): void {
        this.periodoLetivoForm = this._formBuilder.group({
            nome: [null],
            dataInicio: [null],
            dataFim: [null],
            capacidade: [null],
            status: [null]
        });
        this._carregarPeriodo();
        this._carregarStatusPeriodo();
    }

    private _carregarPeriodo() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            this.existePeriodo = true;
            this._fuseLoading.show();
            this.carregandoDados = true;
            return this._periodoLetivoService.buscarPorId<PeriodoLetivo>(this._id)
                .pipe(finalize(() => {
                        this.carregandoDados = false;
                        this._fuseLoading.hide();
                    })
                )
                .subscribe((periodoLetivo) => {
                    this._carregarInformacoesPeriodo(periodoLetivo);
                })

        }

    }

    private _carregarInformacoesPeriodo(periodoLetivo: PeriodoLetivo) {
        this.periodoLetivoForm.get('nome').setValue(periodoLetivo.nome);
        this.periodoLetivoForm.get('dataInicio').setValue(this._dateFormatStringToDatePipe.transform(periodoLetivo.dataInicio));
        this.periodoLetivoForm.get('dataFim').setValue(this._dateFormatStringToDatePipe.transform(periodoLetivo.dataFim));
        this.periodoLetivoForm.get('capacidade').setValue(periodoLetivo.capacidade);
        this.periodoLetivoForm.get('status').setValue(periodoLetivo.statusPeriodoLetivo.id);
    }

    private _carregarStatusPeriodo() {
        this._periodoLetivoService.listarStatusPeriodoLetivo().subscribe(
            (statusPeriodo: StatusPeriodoLetivo[]) => {
                this.statusPeriodo = statusPeriodo;
            }
        );
    }

    salvar() {
        this.botaoSalvarDesabilitado = true;
        this.periodoLetivo = this._payloadPeriodo();

        if (this._id) {
            this._periodoLetivoService.atualizar(this._id, this.periodoLetivo)
                .subscribe(
                    (periodoLetivo) => {
                        this._resetarFormulario();
                        this._router.navigate(['/academico/periodo-letivo']);
                    },
                    (error) => {
                        this.mensagemErro = error.error.message;
                        this.botaoSalvarDesabilitado = false;
                    }
                );
            return;
        }

        this._periodoLetivoService.salvar(this.periodoLetivo)
            .subscribe(
                (periodoLetivo) => {
                    this._resetarFormulario();
                    this._router.navigate(['/academico/periodo-letivo'],
                        {state: {periodoLetivo: periodoLetivo}}
                    );
                },
                (exception) => {
                    const error = exception.error as MensagemErro[];

                    error.forEach((e) => {
                        this.mensagemErro += e.mensagem + "\n";
                    });

                    this.botaoSalvarDesabilitado = false;
                }
            );
    }

    private _resetarFormulario() {
        this.periodoLetivoForm.reset();
        this.periodoLetivo = {} as PeriodoLetivo;
        this.botaoSalvarDesabilitado = false;
    }

    private _payloadPeriodo(): PeriodoLetivo {
        let formulario = Object.assign({}, this.periodoLetivoForm.value);
        let status = this.statusPeriodo.find(status => status.id == formulario.status);

        const {
            nome,
            dataInicio,
            dataFim,
            capacidade,
        } = formulario;

        return {
            nome,
            dataInicio: this._dateFormatDateToStringPipe.transform(dataInicio),
            dataFim: this._dateFormatDateToStringPipe.transform(dataFim),
            capacidade,
            statusPeriodoLetivo: status
        } as PeriodoLetivo;
    }

}