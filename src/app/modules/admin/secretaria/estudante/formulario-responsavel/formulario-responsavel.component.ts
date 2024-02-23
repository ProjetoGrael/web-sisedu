import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TipoResponsavel } from "../model/tipo-responsavel.model";
import { FuseAlertType } from './../../../../../../@fuse/components/alert/alert.types';
import { Responsavel } from './../model/responsavel.model';
import { ResponsavelService } from './../responsavel.service';

@Component({
    selector: 'sisedu-formulario-responsavel',
    templateUrl: './formulario-responsavel.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FormularioResponsavelComponent implements OnInit {

    private responsavel = {} as Responsavel;
    tiposResposavel: TipoResponsavel[] = [];
    private _id: string = null;
    public isExist: boolean = null;
    public isPresent: boolean = null;

    responsavelForm: FormGroup;
    mensagemErro: string = '';
    botaoSalvarDesabilitado = false;
    showAlert: boolean = false;

    constructor(private _formBuilder: FormBuilder,
                private _responsavelService: ResponsavelService,
                private _router: Router,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {

        this.responsavelForm = this._formBuilder.group({
            nome: [undefined],
            sobrenome: [undefined],
            rg: [undefined],
            cpf: [undefined],
            telefone: [undefined],
            celular: [undefined],
            email: [undefined],
            tipoResponsavel: [undefined],
        });

        this.carregarResponsavel();
        this.carregarTiposResponsavel();
    }

    carregarResponsavel() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            return  this._responsavelService.buscarResponsavelPorUUIDEstudante(this._id).subscribe(
                responsavelResponse => {
                    responsavelResponse ? this._carregarInformacoesResponsavel(responsavelResponse) : this.isExist = false;
                }
            );

        }
    }

    buscarResponsavelPorCpf() {
       const cpf = this.responsavelForm.get("cpf").value
        if (cpf) {
            return  this._responsavelService.buscarResponsavelPorCpf(cpf).subscribe(
                responsavelResponse => {
                    this.responsavelForm.get("nome").setValue(responsavelResponse.nome);
                    this.responsavelForm.get("sobrenome").setValue(responsavelResponse.sobrenome);
                    this.responsavelForm.get("rg").setValue(responsavelResponse.rg);
                    this.responsavelForm.get("telefone").setValue(responsavelResponse.telefone);
                    this.responsavelForm.get("celular").setValue(responsavelResponse.celular);
                    this.responsavelForm.get("email").setValue(responsavelResponse.email);
                    this.responsavelForm.get("tipoResponsavel").setValue(responsavelResponse.tipoResponsavel.descricao);
                    this.isExist = true;
                    this.isPresent = false;
                }
            );

        }
    }

    private _carregarInformacoesResponsavel(responsavel: Responsavel) {
        this.responsavelForm.get("nome").setValue(responsavel.nome);
        this.responsavelForm.get("sobrenome").setValue(responsavel.sobrenome);
        this.responsavelForm.get("rg").setValue(responsavel.rg);
        this.responsavelForm.get("cpf").setValue(responsavel.cpf);
        this.responsavelForm.get("telefone").setValue(responsavel.telefone);
        this.responsavelForm.get("celular").setValue(responsavel.celular);
        this.responsavelForm.get("email").setValue(responsavel.email);
        this.responsavelForm.get("tipoResponsavel").setValue(responsavel.tipoResponsavel.descricao);
        this.isExist = true;
        this.isPresent = true;
    }


    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };

    resetarFormulario() {
        this.responsavelForm.reset();
        this.responsavel = {} as Responsavel;
        this.botaoSalvarDesabilitado = false
    }


    cadastrarResponsavel() {
        this.mensagemErro = '';
        this.botaoSalvarDesabilitado = true
        this.responsavel = this.payloadResponsavel();

        if (this.isExist) {
            this._responsavelService.atualizarResponsavel(this._id, this.responsavel).subscribe(() => {
                    this.alert = {
                        type: 'success',
                        message: `Responsável ${this.responsavel.nome} ${this.responsavel.sobrenome} atulizado com sucesso.`
                    };
                    this.showAlert = true
                    this.resetarFormulario();
                    this._router.navigateByUrl('/secretaria/estudante');
                },
                exception => {
                    this.mensagemErro = exception.error.mensagem;
                    this.botaoSalvarDesabilitado = false
                });

                return;

        }

        this._responsavelService.cadastrarResponsavel(this._id, this.responsavel).subscribe(() => {
            this.alert = {
                type: 'success',
                message: `Responsável ${this.responsavel.nome} ${this.responsavel.sobrenome} cadastrado com sucesso.`
            };
            this.showAlert = true
            this.resetarFormulario();
            this._router.navigateByUrl('/secretaria/estudante');
        },
        exception => {
            exception.error.forEach(error => {
                this.mensagemErro += error.mensagem+"<br/>";
            });
            this.botaoSalvarDesabilitado = false
        });

        return;

    }

    payloadResponsavel() {
        let formulario = Object.assign({}, this.responsavelForm.value);

        const {
            nome, sobrenome, rg, cpf, email, celular, telefone, tipoResponsavel
        } = formulario

        return {
            nome, sobrenome, rg, cpf, email, celular, telefone, tipoResponsavel:{descricao: tipoResponsavel}
        }
    }

    deletarResponsavel(){
        this._responsavelService.deletarResponsavel(this._id).subscribe(
            () => {
                this.alert = {
                    type: "success",
                    message: `O responsavel ${this.responsavel.nome} ${this.responsavel.sobrenome} foi deletado com sucesso.`,

                };
                this.showAlert = true;
                this._router.navigateByUrl('/secretaria/estudante');
            },
            (exception) => {
                console.log(exception);
              }
        );
    }

    carregarTiposResponsavel(){
        this._responsavelService.buscarTiposReponsavel()
                                   .subscribe(tipos => {                        
                                        this.tiposResposavel = tipos;
                                    }, exception => {
                                        console.log(exception);
                                    });
    }

}
