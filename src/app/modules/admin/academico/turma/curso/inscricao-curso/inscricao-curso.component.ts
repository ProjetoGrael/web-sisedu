import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {Estudante} from "app/modules/admin/secretaria/estudante/model/estudante.model";
import {TurmaService} from "../../turma.service";
import {MatTableDataSource} from "@angular/material/table";
import {FuseAlertType} from "../../../../../../../@fuse/components/alert";
import {FuseLoadingService} from "../../../../../../../@fuse/services/loading";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {Turma} from "../../model/turma.model";
import {Inscricao} from "../../model/inscricao.model";
import {EstudanteService} from "../../../../secretaria/estudante/estudante.service";
import {Pagina} from "../../../../../../shared/pagina.model";
import {MatPaginator} from "@angular/material/paginator";
import { CursoService } from "../curso.service";
import { Curso } from "../../model/curso.model";

@Component({
    selector: "inscricao-curso", 
    templateUrl: "./inscricao-curso.component.html", 
    encapsulation: ViewEncapsulation.None,
})
export class InscricaoComponent implements OnInit {
    displayedColumnsInscritos: string[] = ["matricula", "nome", "dataNascimento", "acoes"];
    displayedColumns: string[] = ["selecionar", "matricula", "nome", "dataNascimento"];
    estudantesHabilitados: Estudante[];
    estudantesGerais: Estudante[];
    paginacao: Pagina<Estudante>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    estudantesInscritos: Estudante[];
    dataSourceHabilitados: MatTableDataSource<Estudante>;
    dataSourceGerais: MatTableDataSource<Estudante>;
    dataSourceInscritos = new MatTableDataSource<Estudante>();
    _id: number = this._activatedRoute.snapshot.params.id;
    idDisciplina: number;
    estudantesSelecionados: string[] = [];
    cursos: Curso[];
    inscricaoSelecionada: Inscricao;

    alert: { type: FuseAlertType; message: string } = {
        type: "success", message: "",
    };

    showAlert: boolean = false;
    isEmptyListHabilitados: boolean = false;
    isEmptyListGerais: boolean = false;
    isEmptyIncritos: boolean = false;
    isEmptyListPosCarregar: boolean = false;
    isEmptyListCursos: boolean = false;

    haCursosNaTurma: boolean = false;

    constructor(
        private _cursoService: CursoService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fuseLoadingService: FuseLoadingService,
        private _estudanteService: EstudanteService,
        ) {
    }


    async ngOnInit() {
        //this._carregarIdDisciplina();
        this._carregarEstudantesInscritos(this._id);
        this._carregarEstudantesHabilitados(this._id);
        this._carregarEstudantesGerais();
    }


    private _carregarEstudantesInscritos(idCurso: number) {
        this._fuseLoadingService.show();
        this._cursoService.listarEstudantesInscritosPorCurso(idCurso)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((response) => {
                this.estudantesInscritos = response;
                this.isEmptyIncritos = this.estudantesInscritos.length <= 0;
                this.dataSourceHabilitados = new MatTableDataSource<Estudante>(this.estudantesInscritos);
                this.dataSourceInscritos.data = this.estudantesInscritos;
                this._fuseLoadingService.hide();
            }, (exception) => {
                console.log(exception);
                this.isEmptyIncritos = true;
            });
    }

    /*private _carregarIdDisciplina() {
        this._fuseLoadingService.show();
        let idDisciplina: number;
        this._cursoService.buscarCursosCadastrados(this._id)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((cursos) => {
                cursos.map(curso => {
                    if (curso.disciplinaPrincipal) {
                        idDisciplina = curso.instrutorDisciplina.disciplina.id
                        this.idDisciplina = idDisciplina;
                    }
                    this.haCursosNaTurma = cursos.length > 0;
                    this._carregarEstudantesGerais();
                });
              });
    }*/

    private _carregarEstudantesGerais() {
        this._fuseLoadingService.show();
        this._estudanteService.listarComPaginacao<Estudante>()
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((response) => {
                this.estudantesGerais = response.conteudo.filter((estudante) => {
                    return !this.estudantesInscritos.some((estudanteInscrito) => {
                        return estudanteInscrito.id === estudante.id;
                    });
                });
                if (this.estudantesGerais.length == 0) {
                    this.isEmptyListGerais = true;
                }else {
                    this.isEmptyListGerais = false;
                    this.dataSourceGerais = new MatTableDataSource<Estudante>(this.estudantesGerais);
                    this.dataSourceGerais.paginator = this.paginator;
                }
            });

    }

    private _carregarEstudantesHabilitados(idDisciplina: number) {
        this._fuseLoadingService.show();
        this._cursoService.listarEstudantesHabilitadosParaInscricao(idDisciplina)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((response) => {
                this.estudantesHabilitados = response.filter((estudante) => {
                    this.estudantesInscritos.filter((estudanteInscrito ) => {
                        return estudanteInscrito.id !== estudante.id;
                    });
                });
                this.isEmptyListHabilitados = this.estudantesHabilitados.length == 0 ? true : false;
                this.isEmptyListPosCarregar = this.estudantesHabilitados.length == 0 ? true : false;
                this.dataSourceHabilitados = new MatTableDataSource<Estudante>(this.estudantesHabilitados);
                this.dataSourceHabilitados.data = this.estudantesHabilitados;
            }, (exception) => {
                console.log(exception);
                this._fuseLoadingService.hide();
            });

    }


    filtrarInscritos(event: Event) {
        const valorFiltro = (event.target as HTMLInputElement).value;
        this.dataSourceInscritos.filter = valorFiltro.trim().toLowerCase();
    }

    filtrar(event: Event) {
        const valorFiltro = (event.target as HTMLInputElement).value;
        this.dataSourceHabilitados.filter = valorFiltro.trim().toLowerCase();
    }

    filtrarGerais(event: Event) {
        const valorFiltro = (event.target as HTMLInputElement).value;
        this.dataSourceGerais.filter = valorFiltro.trim().toLowerCase();

        if (this.dataSourceGerais.paginator) {
            this.dataSourceGerais.paginator.firstPage();
        }
    }


    atualizarSelecao(event: MatCheckboxChange, uuid: string) {
        if (event.checked) {
            this.estudantesSelecionados.push(uuid);
        } else if (!event.checked) {
            this.estudantesSelecionados.splice(this.estudantesSelecionados.indexOf(uuid), 1);
        }
    }

    inscreverEstudantes() {
        this._fuseLoadingService.show();
        this._cursoService.inscreverEstudante(this._id, this.estudantesSelecionados)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((response) => {
                this._carregarEstudantesInscritos(this._id);
                this._carregarEstudantesHabilitados(this.idDisciplina);
            }, (exception) => {
                console.log(exception);
            });
    }

    listarCursos(estudante: Estudante) {
        this._fuseLoadingService.show();
        this._cursoService.listarComPaginacao<Curso>()
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((cursos) => {
            this.cursos = cursos.conteudo;
            this.cursos.map((curso) => {
                if (curso.id == this._id) {
                    this.cursos.splice(this.cursos.indexOf(curso), 1);
                }
            });
            this.isEmptyListCursos = this.cursos.length <= 0;
        });
        console.log(this.cursos);
    }

    transferirEstudante(curso: Curso, estudante: Estudante) {
        this._fuseLoadingService.show();
        this._cursoService.atualizarInscricao(estudante.id, curso)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((response) => {
            this._carregarEstudantesInscritos(this._id);
            this._carregarEstudantesHabilitados(this.idDisciplina);
                this._fuseLoadingService.hide();
        });
    }


    desativarInscricao(estudante: Estudante) {
        this._fuseLoadingService.show();
        this._cursoService.listarInscricoesPorTurma(this._id)
            .pipe(finalize(() => this._fuseLoadingService.hide()))
            .subscribe((inscricoes) => {
            inscricoes.map((inscricao) => {
                if (inscricao.estudante.id === estudante.id && inscricao.dataFim == null) {
                    this.inscricaoSelecionada = inscricao;
                    this._cursoService.desativarInscricao(this.inscricaoSelecionada.id)
                        .pipe().subscribe((response) => {
                        this._carregarEstudantesInscritos(this._id);
                        this._carregarEstudantesHabilitados(this.idDisciplina);
                        this._carregarEstudantesGerais();
                    });
                }
            });
        });

    }

}