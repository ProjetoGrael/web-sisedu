import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {FuseLoadingService} from "../../../../../../@fuse/services/loading";
import {finalize} from "rxjs/operators";
import {Estudante} from "../../../secretaria/estudante/model/estudante.model";
import {EstudanteService} from "../../../secretaria/estudante/estudante.service";
import {Disciplina} from "../../../academico/disciplina/model/disciplina.model";
import {NotaConselho} from "../../../academico/conselho-de-classe/model/nota-conselho.enum";
import {Conselho} from "../../../academico/conselho-de-classe/model/conselho.model";
import {TurmaService} from "../../../academico/turma/turma.service";
import {idade} from "../../../../../core/utils/data.utils";
import { CursoService } from "../curso/curso.service";
import Chart from 'chart.js/auto';
import { PautaService } from "../curso/pauta/pauta.service";
import { Metrica } from "../model/metrica.model";

@Component({
    selector: "sisedu-conselho-de-classe",
    templateUrl: "conselho-de-classe.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class ConselhoDeClasseComponent implements OnInit {
    conselhoForm: FormGroup;
    carregandoDadosConselho: boolean = false;
    mensagemErro: string = "";
    estudante = {} as Estudante;
    proximasDisciplinas= [] as Disciplina[];
    notasIniciais = [] as NotaConselho[];
    notasParciais = [] as NotaConselho[];
    notasFinais = [] as NotaConselho[];
    idadeEstudante: number = undefined;

    private conselho = {} as Conselho;
    _idEstudante: string = null;
    _idCurso: string = null;
    _idTurma: string = null;
    idConselho: number = null;
    chart: any;

    metrica: Metrica;

    constructor(
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _fuseLoading: FuseLoadingService,
        private _router: Router,
        private _cursoService: CursoService,
        private _pautaService: PautaService,
        private _turmaService: TurmaService,
        private _estudanteService: EstudanteService
    ) {}

    ngOnInit(): void {
        this.conselhoForm = this._formBuilder.group({
            conselhoInicial: [undefined],
            conselhoParcial: [undefined],
            conselhoFinal: [undefined],
            situacao: [undefined],
            opiniaoConselho: [undefined],
            proximaDisciplinaPrincipalCurso: [undefined],
        });
        this._carregarConselho();
        this._carregarNotas();
        this._carregarEstudante();
        this._carregarProximasDisciplinas();
        this.criarGrafico();
    }

    private _carregarConselho() {
        this._idEstudante = this._activatedRoute.snapshot.params.idEstudante;
        this._idCurso = this._activatedRoute.snapshot.params.idCurso;
        this._idTurma = this._activatedRoute.snapshot.params.idTurma;

        this._fuseLoading.show();

        this._cursoService
            .buscarConselhoPorEstudante(this._idEstudante, this._idCurso)
            .pipe(
                finalize(() => {
                    this.carregandoDadosConselho = false;
                    this._fuseLoading.hide();
                })
            )
            .subscribe((conselho) => {
                this.conselho = conselho;
                this.idConselho = conselho.id;
                this._carregarFormulario()
            });
    }

    private _carregarNotas() {
        this.notasIniciais = Object.keys(NotaConselho).map((key) => NotaConselho[key]).filter((value) => typeof value === "string");
        this.notasParciais = Object.keys(NotaConselho).map((key) => NotaConselho[key]).filter((value) => typeof value === "string");;
        this.notasFinais = Object.keys(NotaConselho).map((key) => NotaConselho[key]).filter((value) => typeof value === "string");;
    }

    private _carregarFormulario(){
        this.conselhoForm.get("conselhoInicial").setValue(this.conselho.conselhoInicial ? this.conselho.conselhoInicial : undefined);
        this.conselhoForm.get("conselhoParcial").setValue(this.conselho.conselhoParcial ? this.conselho.conselhoParcial : undefined);
        this.conselhoForm.get("conselhoFinal").setValue(this.conselho.conselhoFinal ? this.conselho.conselhoFinal : undefined);
        this.conselhoForm.get("situacao").setValue(this.conselho.situacao);
        this.conselhoForm.get("opiniaoConselho").setValue(this.conselho.opiniaoConselho ? this.conselho.opiniaoConselho.toString() : undefined);
        this.conselhoForm.get("proximaDisciplinaPrincipalCurso").setValue(this.conselho.proximaDisciplinaPrincipalCurso ? this.conselho.proximaDisciplinaPrincipalCurso : undefined);
    }

    atualizarConselho() {
        this._cursoService
            .atualizarConselhoDeClasse(this.idConselho, this._payloadConselho())
            .subscribe((conselho) => {
                this._router.navigate([`/academico/turma/${this._idTurma}/curso/${this._idCurso}/estudantes-curso`]);
            });
    }

    private _payloadConselho() {
        let formulario = Object.assign({},this.conselhoForm.value);

        const { conselhoInicial, conselhoParcial, conselhoFinal, opiniaoConselho, proximaDisciplinaPrincipalCurso} = formulario;

        return {
            conselhoInicial,
            conselhoParcial,
            conselhoFinal,
            opiniaoConselho,
            proximaDisciplinaPrincipalCurso
        } as Conselho;
    }

    private _carregarEstudante() {
        this._idEstudante = this._activatedRoute.snapshot.params.idEstudante;
        this._estudanteService
            .buscarPorId(this._idEstudante)
            .subscribe((estudante) => {
                this.estudante = estudante as Estudante;
                let dataNascimentoSplit= this.estudante.dataNascimento.toString().split("/");
                this.idadeEstudante = this.idade(dataNascimentoSplit[2]+"-"+dataNascimentoSplit[1]+"-"+dataNascimentoSplit[0]);
            });

    }

    private _carregarProximasDisciplinas() {
        this._turmaService
            .listarDisciplinasPrincipais()
            .subscribe((disciplinas) => {
                this.proximasDisciplinas = disciplinas;
            });
    }

    private idade(dataNascimento: string) {
        let hoje = new Date();
        let nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        let mes = hoje.getMonth() - nascimento.getMonth();

        if (mes < 0 || (mes == 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }

        return idade;
    }

    protected readonly undefined = undefined;


    criarGrafico(){
        this._pautaService.buscarMetricas(this._idCurso, this._idEstudante).subscribe(metrica => {
            this.metrica = metrica;

            const percentualPresenca: number = +metrica.percentualPresenca.replace('%', '').replace(',', '.'); 
            const percentualAtrasado: number = +metrica.percentualAtrasado.replace('%', '').replace(',', '.');
            const percentualAusente: number = +metrica.percentualAusente.replace('%', '').replace(',', '.');
            const percentualFaltaJustificada: number = +metrica.percentualFaltaJustificada.replace('%', '').replace(',', '.');
            const percentualNaoLancado: number = +metrica.percentualNaoLancado.replace('%', '').replace(',', '.');

            const dados = [percentualPresenca, percentualAusente, percentualAtrasado, percentualFaltaJustificada, percentualNaoLancado];

            this.chart = new Chart("MetricasEstudante", {
                type: 'pie',

                data: {
                    labels: ["Presente", 'Ausência', 'Atrasos', 'Faltas Justificadas', 'Não Lançado'],
                    datasets: [{
                        label: 'Percentual (%)',
                        data: dados,
                        backgroundColor: [
                            '#2ecc71', 
                            '#e74c3c',
                            '#8e44ad',
                            '#e67e22',
                            '#3498db',                                      
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    aspectRatio: 2.5,
                    responsive: true,
                    maintainAspectRatio: false,  
                    layout: {
                        padding: {
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom: 0
                        }
                    }
                },
               
            }); 
        }, exception =>  {

        });
             
    }
}