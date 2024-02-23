import {finalize} from 'rxjs/operators';
import {
    Component,
    Inject,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from "@angular/core";

import {Disciplina} from "./model/disciplina.model";
import {Pagina} from "../../../../shared/pagina.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {FuseAlertType} from "../../../../../@fuse/components/alert";
import {Router} from "@angular/router";
import {FuseLoadingService} from '@fuse/services/loading';
import {DisciplinaService} from './disciplina.service';

@Component({
    selector: "disciplina",
    templateUrl: "./disciplina.component.html",
    encapsulation: ViewEncapsulation.None,
})
export class DisciplinaComponent implements OnInit {
    displayedColumns: string[] = [
        "nome",
        "tipo",
        "ativo",
        "cargaHoraria",
        "opcoes",
    ];
    paginacao: Pagina<Disciplina>;
    dataSource: MatTableDataSource<Disciplina>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    alert: { type: FuseAlertType; message: string } = {
        type: "success",
        message: "",
    };
    showAlert: boolean = false;
    isEmptyList: boolean = false;

    constructor(
        private _disciplinaService: DisciplinaService,
        private _router: Router,
        private _fuseLoadingService: FuseLoadingService
    ) {
    }

    ngOnInit(): void {
        this.carregarDisciplinas();
    }

    carregarDisciplinas() {
        this._fuseLoadingService.show();
        this._disciplinaService.listarComPaginacao<Disciplina>(1, 5)
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                (response) => {
                    this.paginacao = response;
                    this.isEmptyList = this.paginacao.total > 0 ? false : true;
                    this.dataSource = new MatTableDataSource<Disciplina>(this.paginacao.conteudo);
                    this.dataSource.paginator = this.paginator;
                },
                (exception) => {
                    console.log(exception);
                }
            );
    }

    atualizarDataTable(disciplina: Disciplina) {

        this._fuseLoadingService.show();
        this._disciplinaService.listarComPaginacao<Disciplina>(this.paginator.pageIndex, this.paginator.pageSize)
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                (response) => {
                    this.dataSource.data = response.conteudo;
                },
                (exception) => {
                }
            );
    }

    filtrar(event: Event) {
        const valorFiltro = (event.target as HTMLInputElement).value;
        this.dataSource.filter = valorFiltro.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


    editar(id: string) {
        return `/academico/disciplina/formulario/${id}`;
    }

    planoAula(id: string) {
        return `/academico/disciplina/${id}/plano-aula`;
    }

    deletar(disciplina: Disciplina) {
        this._fuseLoadingService.show();
        this._disciplinaService.deletar(disciplina.id)
            .pipe(
                finalize(() => this._fuseLoadingService.hide())
            )
            .subscribe(
                () => {
                    this.alert = {
                        type: "success",
                        message: `A disciplina ${disciplina.nome} foi inativada com sucesso.`,
                    };
                    this.showAlert = true;
                    this.atualizarDataTable(disciplina);
                },
                (exception) => {
                    console.log(exception);
                }
            );
    }

    

}
