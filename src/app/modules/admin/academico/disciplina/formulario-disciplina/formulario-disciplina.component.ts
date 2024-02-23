import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Disciplina} from "../model/disciplina.model";
import {FuseLoadingService} from './../../../../../../@fuse/services/loading/loading.service';
import {ActivatedRoute, Router} from "@angular/router";
import {FuseConfirmationService} from "../../../../../../@fuse/services/confirmation";
import {DisciplinaService} from "../disciplina.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {MensagemErro} from "../../../../../core/error/mensagem-erro.model";
import {Nivel} from "../model/nivel.model";
import {Programa} from "../model/programa.model";
import {NivelService} from "../nivel.service";
import {ProgramaService} from "../programa.service";

@Component({
    selector: "sisedu-formulario-disciplina",
    templateUrl: "./formulario-disciplina.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class FormularioDisciplinaComponent implements OnInit {
    private disciplina = {} as Disciplina;
    private _id: string = null;

    niveis: Nivel[] = [];
    programas: Programa[] = [];

    disciplinaForm: FormGroup;
    programaForm: FormGroup;
    mensagemErro: string = "";
    botaoSalvarDesabilitado = false;
    carregandoDados = false;
    nivelada = true;
    cadastrarNovo = false;
    existeDisciplina = false;
    statusDefault = true;


    constructor(
        private _formBuilder: FormBuilder,
        private _disciplinaService: DisciplinaService,
        private _programaService: ProgramaService,
        private _nivelService: NivelService,
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _activatedRoute: ActivatedRoute,
        private _fuseLoading: FuseLoadingService,
    ) {
    }

    ngOnInit(): void {
        this.disciplinaForm = this._formBuilder.group({
            nome: [null],
            tipo: [null],
            cargaHoraria: [null],
            ativo: [null],
            nivel: [null],
            programa: [null],
            novoPrograma: [null]
        });

        this.programaForm = this._formBuilder.group({
            nome: [null]
        });

        this._carregarDisciplina();
        this._carregarNiveis();
        this._carregarProgramas();
    }

    private _carregarProgramas() {
        this._programaService.buscarTodosProgramas().subscribe(
            (programas) => {
                this.programas = programas;
            },
            (exception) => {
                const erro = exception.error as MensagemErro;
                this.mensagemErro = erro.mensagem;
            }
        );
    }

    private _carregarNiveis() {
        this._nivelService.buscarTodosNiveis().subscribe(
            (niveis) => {
                this.niveis = niveis;
            },
            (exception) => {
                const erro = exception.error as MensagemErro;
                this.mensagemErro = erro.mensagem;
            }
        );
    }

    private _carregarDisciplina() {
        this._id = this._activatedRoute.snapshot.params.id;
        if (this._id) {
            this.existeDisciplina = true;
            this._fuseLoading.show();
            this.carregandoDados = true;
            return this._disciplinaService.buscarPorId<Disciplina>(this._id)
                .pipe(finalize(() => {
                        this.carregandoDados = false;
                        this._fuseLoading.hide();
                    })
                )
                .subscribe((disciplina) => {
                    this._carregarInformacoesDisciplina(disciplina);
                })
        }

    }

    private _carregarInformacoesDisciplina(disciplina: Disciplina) {
        this.disciplinaForm.get("nome").setValue(disciplina.nome);
        this.disciplinaForm.get("tipo").setValue(this.getTipoDsiciplina(disciplina.tipo));
        this.disciplinaForm.get("cargaHoraria").setValue(disciplina.cargaHoraria);
        this.disciplinaForm.get("ativo").setValue(disciplina.ativo ? "true" : "false");
        this.disciplinaForm.get("programa").setValue(disciplina.programa.id);
        this.disciplinaForm.get("nivel").setValue(disciplina.nivel.id);
    }

    salvar() {
        this.botaoSalvarDesabilitado = true;
        this.disciplina = this._payloadDisciplina();

        if (this._id) {
            this._disciplinaService.atualizar(this._id, this.disciplina).subscribe(
                (response) => {
                    this._resetarFormulario();
                    this._router.navigate(["/academico/disciplina"]);
                },
                (error) => {
                    this.mensagemErro = error.error.message;
                    this.botaoSalvarDesabilitado = false;
                }
            );
            return;
        }

        this._disciplinaService.salvar(this.disciplina).subscribe(
            (response) => {
                this._resetarFormulario();
                this._router.navigate(["/academico/disciplina"],
                    {state: {disciplina: response}}
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
        this.disciplinaForm.reset();
        this.disciplina = {} as Disciplina;
        this.botaoSalvarDesabilitado = false;
    }

    private getTipoDsiciplina(tipo) {
        return tipo == "NIVELADA" ? "nivelada" : "comum";
    }

    verificaTipo(tipoSelecionado) {
        tipoSelecionado.value == "comum" ? this.nivelada = false : this.nivelada = true;
    }

    verificaCadastrarPrograma(valor) {
        valor == "novo" ? this.cadastrarNovo = true : this.cadastrarNovo = false;
    }

    salvarNovoPrograma(){
        let payloadPrograma = this._payloadPrograma(this.programaForm.get("nome").value);
        this.carregandoDados = true;
        this._programaService.salvar(payloadPrograma)
            .subscribe(
                (response) => {
                    this.carregandoDados = false;
                    this.cadastrarNovo = false;
                    this._carregarProgramas();
                }
            )

    }

    private _payloadPrograma(nome) {
        return {
            nome
        } as Programa;
    }


    private _payloadDisciplina(): Disciplina {
        let formulario = Object.assign({}, this.disciplinaForm.value);
        let nivel = this.niveis.find(nivel => nivel.id == formulario.nivel);
        let programa = this.programas.find(programa => programa.id == formulario.programa);

        const {
            nome,
            tipo,
            cargaHoraria,
            ativo,
        } = formulario;

        return {
            nome,
            tipo,
            cargaHoraria,
            ativo,
            nivel,
            programa,
        } as Disciplina;
    }


}