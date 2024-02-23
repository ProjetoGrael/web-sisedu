import { finalize } from 'rxjs/operators';
import { FuseLoadingService } from './../../../../../../@fuse/services/loading/loading.service';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChecklistDocumentacao} from "../model/checklist.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {EstudanteService} from "../estudante.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'sisedu-checklist-documentacao-estudante',
    templateUrl: 'checklist-documentacao-estudante.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CheckListDocumentacaoComponent implements OnInit {

    private checklist = {} as ChecklistDocumentacao;
    private _id: string = null;
    private isExist: boolean = null;

    checkListForm: FormGroup;
    botaoSalvarDesabilitado = false;
    carregandoCheckList = false

    constructor(private _formBuilder: FormBuilder,
                private _estudanteService: EstudanteService,
                private _router: Router,
                private _fuseLoading: FuseLoadingService,
                private _activatedRoute: ActivatedRoute) {
    }


    ngOnInit(): void {

        this.checkListForm = this._formBuilder.group(
            {
                rgEstudante: [undefined],
                rgResponsavel: [undefined],
                cpfEstudante: [undefined],
                cpfResponsavel: [undefined],
                comprovanteResidencia: [undefined],
                declaracaoEscolar: [undefined],
                certidaoNascimento: [undefined],
                termoAudioVideo: [undefined],
                atestadoMedico: [undefined],
                historicoEscolar: [undefined]
            });

        this.carregarCheckListDocuemntacaoEstudante();

    }

    carregarCheckListDocuemntacaoEstudante() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            this._fuseLoading.show();
            this.carregandoCheckList = true;
            return this._estudanteService.buscarChecklistDocumentacaoPorIdEstudante(this._id)
                .pipe(finalize(() =>{
                    this.carregandoCheckList = false
                    this._fuseLoading.hide();
                }))
                .subscribe(
                    checklist => {
                        checklist ? this._carregarInformacoesChecklistDocumentacao(checklist) : this.isExist = false;
                    }
                )
        }
    }

    private _carregarInformacoesChecklistDocumentacao(checklist: ChecklistDocumentacao) {
        this.checkListForm.get("rgEstudante").setValue(checklist.rgEstudante ? checklist.rgEstudante : false);
        this.checkListForm.get("rgResponsavel").setValue(checklist.rgResponsavel ? checklist.rgResponsavel : false);
        this.checkListForm.get("cpfEstudante").setValue(checklist.cpfEstudante ? checklist.cpfEstudante : false);
        this.checkListForm.get("cpfResponsavel").setValue(checklist.cpfResponsavel ? checklist.cpfResponsavel : false);
        this.checkListForm.get("comprovanteResidencia").setValue(checklist.comprovanteResidencia ? checklist.comprovanteResidencia : false);
        this.checkListForm.get("declaracaoEscolar").setValue(checklist.declaracaoEscolar ? checklist.declaracaoEscolar : false);
        this.checkListForm.get("certidaoNascimento").setValue(checklist.certidaoNascimento ? checklist.certidaoNascimento : false);
        this.checkListForm.get("termoAudioVideo").setValue(checklist.termoAudioVideo ? checklist.termoAudioVideo : false);
        this.checkListForm.get("atestadoMedico").setValue(checklist.atestadoMedico ? checklist.atestadoMedico : false);
        this.checkListForm.get("historicoEscolar").setValue(checklist.historicoEscolar ? checklist.historicoEscolar : false);
        this.isExist = true;
    }

    salvar() {
        this.botaoSalvarDesabilitado = true
        this.checklist = this.payloadCheckList();

        if (this.isExist) {
            this._estudanteService.atualizarChecklist(this._id, this.checklist).subscribe(
                response => {
                    this._router.navigateByUrl('/secretaria/estudante', {state: {checklist: response}});
                },
                exception => {
                    this.botaoSalvarDesabilitado = false
                }
            )
            this.botaoSalvarDesabilitado = false
            return;
        }
        this._estudanteService.salvarChecklist(this._id, this.checklist).subscribe(
            response => {
                this._router.navigateByUrl('/secretaria/estudante', {state: {checklist: response}});
            },
            exception => {
                this.botaoSalvarDesabilitado = false
            }
        )
        this.botaoSalvarDesabilitado = false
        return;
    }

    payloadCheckList() {
        let formulario = Object.assign({}, this.checkListForm.value);

        const rgEstudante = formulario.rgEstudante;
        const rgResponsavel = formulario.rgResponsavel;
        const cpfEstudante = formulario.cpfEstudante;
        const cpfResponsavel = formulario.cpfResponsavel;
        const comprovanteResidencia = formulario.comprovanteResidencia;
        const declaracaoEscolar = formulario.declaracaoEscolar;
        const certidaoNascimento = formulario.certidaoNascimento;
        const termoAudioVideo = formulario.termoAudioVideo;
        const atestadoMedico = formulario.atestadoMedico;
        const historicoEscolar = formulario.historicoEscolar;


        return {
            rgEstudante,
            rgResponsavel,
            cpfEstudante,
            cpfResponsavel,
            comprovanteResidencia,
            declaracaoEscolar,
            certidaoNascimento,
            termoAudioVideo,
            atestadoMedico,
            historicoEscolar
        }
    }

}