import { delay, finalize } from 'rxjs/operators';
import { FuseLoadingService } from './../../../../../../@fuse/services/loading/loading.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EstudanteService} from "../estudante.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SituacaoEscolar} from "../model/situacao-escolar.model";
import {Estado} from "../../../../../core/helper/model/estado.model";
import {Escola} from "../model/escola.model";
import {EnderecoHelperService} from "../../../../../core/helper/endereco-helper.service";
import {EscolaService} from "../escola.service";

@Component({
    selector: 'sisedu-situacao-escolar-estudante',
    templateUrl: 'situacao-escolar-estudante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SituacaoEscolarEstudanteComponent implements OnInit {

    private situacaoEscolar = {} as SituacaoEscolar;
    private _id: string = null;
    private isExist: boolean = null;
    private isFundOuMedio: boolean = null;
    private isSuperior: boolean = null;
    private isCursando: boolean = null;

    estados: Estado[] = [];
    escolas: Escola[] = [];

    situacaoEscolarForm: FormGroup;
    botaoSalvarDesabilitado = false;
    carregandoSituacaoEscolar = false;

    constructor(private _formBuilder: FormBuilder,
                private _estudanteService: EstudanteService,
                private _escolaService: EscolaService,
                private _enderecoHelperService: EnderecoHelperService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private _fuseLoading: FuseLoadingService) {
    }


    ngOnInit(): void {

        this.situacaoEscolarForm = this._formBuilder.group(
            {
                escolaridade: [undefined],
                turno: [undefined],
                periodo: [undefined],
                situacao: [undefined],
                bolsista: [undefined],
                estado_escolaridade: [undefined],
                nivel: [undefined],
                escola: [undefined],
            });

        this._carregarSituacaoEscolarFormEstudante();
        this._carregaEstados();
        this._carregarEscolas();

    }

    _carregarSituacaoEscolarFormEstudante() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            this._fuseLoading.show();
            this.carregandoSituacaoEscolar = true;

            return this._estudanteService.buscarSituacaoEscolarPorIdEstudante(this._id)
                .pipe(finalize(() => {
                    this.carregandoSituacaoEscolar = false;
                    this._fuseLoading.hide();
                }))
                .subscribe(
                    situacaoEscolar => {
                        situacaoEscolar ? this._carregarInformacoesSituacaoEscolar(situacaoEscolar) : this.isExist = false;
                    }
                );
        }
    }

    private _carregaEstados(){
        this._enderecoHelperService.buscarTodosEstados()
            .subscribe(estados => {
                this.estados = estados;
            }, exception => {
                console.log(exception);
            });
    }
    private _carregarEscolas(){
        this._escolaService.buscarEscolas()
            .subscribe(
                escolas => {
                    this.escolas = escolas;
                }, exception => {
                    console.log(exception);
                });
    }

    private _carregarInformacoesSituacaoEscolar(situacaoEscolar: SituacaoEscolar) {
        this.situacaoEscolarForm.get("escolaridade").setValue(situacaoEscolar.escolaridade);
        this.situacaoEscolarForm.get("turno").setValue(situacaoEscolar.turno);
        this.situacaoEscolarForm.get("periodo").setValue(situacaoEscolar.periodo);
        this.situacaoEscolarForm.get("situacao").setValue(situacaoEscolar.situacao);
        this.situacaoEscolarForm.get("bolsista").setValue(situacaoEscolar.bolsista);
        this.situacaoEscolarForm.get("estado_escolaridade").setValue(situacaoEscolar.estado_escolaridade);
        this.situacaoEscolarForm.get("nivel").setValue(situacaoEscolar.nivel);
        this.situacaoEscolarForm.get("escola").setValue(situacaoEscolar.escola.id);
        this.isExist = true
    }

    salvar() {
        this.botaoSalvarDesabilitado = true
        this.situacaoEscolar = this.payloadSituacaoEscolar();

        if (this.isExist) {
            this._estudanteService.atualizarSituacaoEscolar(this._id, this.situacaoEscolar).subscribe(
                response => {
                    this._router.navigateByUrl('/secretaria/estudante', {state: {situacaoEscolar: response}});
                },
                exception => {
                    this.botaoSalvarDesabilitado = false
                }
            )
            this.botaoSalvarDesabilitado = false
            return;
        }
        this._estudanteService.salvarSituacaoEscolar(this._id, this.situacaoEscolar).subscribe(
            response => {
                this._router.navigateByUrl('/secretaria/estudante', {state: {situacaoEscolar: response}});
            },
            exception => {
                this.botaoSalvarDesabilitado = false
            }
        )
        this.botaoSalvarDesabilitado = false
        return;
    }

    payloadSituacaoEscolar() {
        let formulario = Object.assign({}, this.situacaoEscolarForm.value);

        const escolaridade = formulario.escolaridade;
        const turno = formulario.turno;
        const situacao = formulario.situacao;
        const bolsista = formulario.bolsista;
        const periodo = formulario.periodo;
        const estado_escolaridade = formulario.estado_escolaridade;
        const nivel = formulario.nivel;
        const escola = {
            id: formulario.escola,
            nome: formulario.escola.nome
        }


        return {
            escolaridade,
            turno,
            periodo,
            situacao,
            bolsista,
            estado_escolaridade,
            nivel,
            escola
        }
    }

    verificaEscolaridade(escolaridade){
        if(escolaridade.value == 'fundamental' || escolaridade.value == 'medio'){
            this.isFundOuMedio = true;
            this.isSuperior = false;

        } else if(escolaridade.value == 'superior'){
            this.isSuperior = true;
            this.isFundOuMedio = false;

        } else {
            this.isFundOuMedio = false;
            this.isSuperior = false;
        }
    }

    verificaTurno(turno){
        if(turno.value == 'cursando'){
            this.isCursando = true;
    } else {
        this.isCursando = false;
    }
}


}