import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {Estudante} from "app/modules/admin/secretaria/estudante/model/estudante.model";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {finalize} from "rxjs/operators";
import {MatPaginator} from "@angular/material/paginator";
import { Pagina } from "app/shared/pagina.model";
import { FuseAlertType } from "@fuse/components/alert";
import { FuseLoadingService } from "@fuse/services/loading";
import { EstudanteService } from "app/modules/admin/secretaria/estudante/estudante.service";
import { CursoService } from "../curso.service";

@Component({
    selector: "estudantes-curso",
    templateUrl: "./estudantes-curso.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class EstudantesCursoComponent implements OnInit {
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

    alert: { type: FuseAlertType; message: string } = {
        type: "success", message: "",
    };

    showAlert: boolean = false;
    isEmptyListHabilitados: boolean = false;
    isEmptyListGerais: boolean = false;
    isEmptyIncritos: boolean = false;
    isEmptyListPosCarregar: boolean = false;

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
                } else {
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
                    this.estudantesInscritos.filter((estudanteInscrito) => {
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

    conselho(idEstudante: string) {
        return `${idEstudante}/conselho-de-classe`;
    }

}